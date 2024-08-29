/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SavedObjectsClientContract } from 'opensearch-dashboards/public';
import { map } from 'rxjs/operators';
import {
  DEFAULT_DATA,
  DataStructure,
  DataStructureCustomMeta,
  Dataset,
} from '../../../../../common';
import { DatasetTypeConfig } from '../types';
import { getSearchService, getIndexPatterns } from '../../../../services';
import { injectMetaToDataStructures } from './utils';

export const indexTypeConfig: DatasetTypeConfig = {
  id: DEFAULT_DATA.SET_TYPES.INDEX,
  title: 'Indexes',
  meta: {
    icon: { type: 'logoOpenSearch' },
    tooltip: 'OpenSearch Indexes',
  },

  toDataset: (path) => {
    const index = path[path.length - 1];
    const dataSource = path.find((ds) => ds.type === 'DATA_SOURCE');
    const indexMeta = index.meta as DataStructureCustomMeta;

    return {
      id: index.id,
      title: index.title,
      type: DEFAULT_DATA.SET_TYPES.INDEX,
      timeFieldName: indexMeta?.timeFieldName,
      dataSource: dataSource
        ? {
            id: dataSource.id,
            title: dataSource.title,
            type: dataSource.type,
          }
        : DEFAULT_DATA.STRUCTURES.LOCAL_DATASOURCE,
    };
  },

  fetch: async (services, path) => {
    const dataStructure = path[path.length - 1];
    switch (dataStructure.type) {
      case 'DATA_SOURCE': {
        const indices = await fetchIndices(dataStructure);
        return {
          ...dataStructure,
          hasNext: false,
          columnHeader: 'Indexes',
          children: indices.map((indexName) => ({
            id: `${dataStructure.id}::${indexName}`,
            title: indexName,
            type: 'INDEX',
          })),
        };
      }

      default: {
        const dataSources = await fetchDataSources(services.savedObjects.client);
        return {
          ...dataStructure,
          columnHeader: 'Cluster',
          hasNext: true,
          children: dataSources,
        };
      }
    }
  },

  fetchFields: async (dataset) => {
    const fields = await getIndexPatterns().getFieldsForWildcard({
      pattern: dataset.title,
      dataSourceId: dataset.dataSource?.id,
    });
    return fields.map((field: any) => ({
      name: field.name,
      type: field.type,
    }));
  },

  supportedLanguages: (dataset: Dataset): string[] => {
    return ['SQL', 'PPL'];
  },
};

const fetchDataSources = async (client: SavedObjectsClientContract) => {
  const response = await client.find<any>({
    type: 'data-source',
    perPage: 10000,
  });
  const dataSources: DataStructure[] = [DEFAULT_DATA.STRUCTURES.LOCAL_DATASOURCE].concat(
    response.savedObjects.map((savedObject) => ({
      id: savedObject.id,
      title: savedObject.attributes.title,
      type: 'DATA_SOURCE',
    }))
  );

  return injectMetaToDataStructures(dataSources);
};

const fetchIndices = async (dataStructure: DataStructure): Promise<string[]> => {
  const search = getSearchService();
  const buildSearchRequest = () => ({
    params: {
      ignoreUnavailable: true,
      expand_wildcards: 'all',
      index: '*',
      body: {
        size: 0,
        aggs: {
          indices: {
            terms: {
              field: '_index',
              size: 100,
            },
          },
        },
      },
    },
    dataSourceId: dataStructure.id,
  });

  const searchResponseToArray = (response: any) => {
    const { rawResponse } = response;
    return rawResponse.aggregations
      ? rawResponse.aggregations.indices.buckets.map((bucket: { key: any }) => bucket.key)
      : [];
  };

  return search
    .getDefaultSearchInterceptor()
    .search(buildSearchRequest())
    .pipe(map(searchResponseToArray))
    .toPromise();
};
