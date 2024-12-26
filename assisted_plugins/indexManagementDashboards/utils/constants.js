"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SYSTEM_INDEX = exports.SYSTEM_ALIAS = exports.REQUEST = exports.NODE_API = exports.BASE_API_PATH = void 0;
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const BASE_API_PATH = exports.BASE_API_PATH = "/api/ism";
const NODE_API = exports.NODE_API = Object.freeze({
  _SEARCH: `${BASE_API_PATH}/_search`,
  _SEARCH_SAMPLE_DATA: `${BASE_API_PATH}/_searchSampleData`,
  _INDICES: `${BASE_API_PATH}/_indices`,
  _DATA_STREAMS: `${BASE_API_PATH}/_data_streams`,
  _ALIASES: `${BASE_API_PATH}/_aliases`,
  _MAPPINGS: `${BASE_API_PATH}/_mappings`,
  APPLY_POLICY: `${BASE_API_PATH}/applyPolicy`,
  EDIT_ROLLOVER_ALIAS: `${BASE_API_PATH}/editRolloverAlias`,
  POLICIES: `${BASE_API_PATH}/policies`,
  _RECOVERY: `${BASE_API_PATH}/_recovery`,
  ROLLUPS: `${BASE_API_PATH}/rollups`,
  TRANSFORMS: `${BASE_API_PATH}/transforms`,
  MANAGED_INDICES: `${BASE_API_PATH}/managedIndices`,
  CHANNELS: `${BASE_API_PATH}/_notifications/channels`,
  RETRY: `${BASE_API_PATH}/retry`,
  CHANGE_POLICY: `${BASE_API_PATH}/changePolicy`,
  REMOVE_POLICY: `${BASE_API_PATH}/removePolicy`,
  SMPolicies: `${BASE_API_PATH}/smPolicies`,
  _SNAPSHOTS: `${BASE_API_PATH}/_snapshots`,
  _REPOSITORIES: `${BASE_API_PATH}/_repositores`,
  PUT_INDEX: `${BASE_API_PATH}/putIndex`,
  API_CALLER: `${BASE_API_PATH}/apiCaller`
});
const REQUEST = exports.REQUEST = Object.freeze({
  PUT: "PUT",
  DELETE: "DELETE",
  GET: "GET",
  POST: "POST",
  HEAD: "HEAD"
});
const SYSTEM_INDEX = exports.SYSTEM_INDEX = [".plugins-ml-model", ".plugins-ml-task", ".opendistro-alerting-config", ".opendistro-alerting-alert*", ".opendistro-anomaly-results*", ".opendistro-anomaly-detector*", ".opendistro-anomaly-checkpoints", ".opendistro-anomaly-detection-state", ".opendistro-reports-*", ".opensearch-notifications-*", ".opensearch-notebooks", ".opensearch-observability", ".opendistro-asynchronous-search-response*", ".opendistro_security", ".opendistro-job-scheduler-lock", ".opendistro-ism-config", ".replication-metadata-store", "kibana*", ".kibana*", ".tasks"];
const SYSTEM_ALIAS = exports.SYSTEM_ALIAS = [".plugins*", ".opendistro*", ".opensearch*", ".replication-metadata-store", "kibana*", ".kibana*", ".tasks"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCQVNFX0FQSV9QQVRIIiwiZXhwb3J0cyIsIk5PREVfQVBJIiwiT2JqZWN0IiwiZnJlZXplIiwiX1NFQVJDSCIsIl9TRUFSQ0hfU0FNUExFX0RBVEEiLCJfSU5ESUNFUyIsIl9EQVRBX1NUUkVBTVMiLCJfQUxJQVNFUyIsIl9NQVBQSU5HUyIsIkFQUExZX1BPTElDWSIsIkVESVRfUk9MTE9WRVJfQUxJQVMiLCJQT0xJQ0lFUyIsIl9SRUNPVkVSWSIsIlJPTExVUFMiLCJUUkFOU0ZPUk1TIiwiTUFOQUdFRF9JTkRJQ0VTIiwiQ0hBTk5FTFMiLCJSRVRSWSIsIkNIQU5HRV9QT0xJQ1kiLCJSRU1PVkVfUE9MSUNZIiwiU01Qb2xpY2llcyIsIl9TTkFQU0hPVFMiLCJfUkVQT1NJVE9SSUVTIiwiUFVUX0lOREVYIiwiQVBJX0NBTExFUiIsIlJFUVVFU1QiLCJQVVQiLCJERUxFVEUiLCJHRVQiLCJQT1NUIiwiSEVBRCIsIlNZU1RFTV9JTkRFWCIsIlNZU1RFTV9BTElBUyJdLCJzb3VyY2VzIjpbImNvbnN0YW50cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjb25zdCBCQVNFX0FQSV9QQVRIID0gXCIvYXBpL2lzbVwiO1xuZXhwb3J0IGNvbnN0IE5PREVfQVBJID0gT2JqZWN0LmZyZWV6ZSh7XG4gIF9TRUFSQ0g6IGAke0JBU0VfQVBJX1BBVEh9L19zZWFyY2hgLFxuICBfU0VBUkNIX1NBTVBMRV9EQVRBOiBgJHtCQVNFX0FQSV9QQVRIfS9fc2VhcmNoU2FtcGxlRGF0YWAsXG4gIF9JTkRJQ0VTOiBgJHtCQVNFX0FQSV9QQVRIfS9faW5kaWNlc2AsXG4gIF9EQVRBX1NUUkVBTVM6IGAke0JBU0VfQVBJX1BBVEh9L19kYXRhX3N0cmVhbXNgLFxuICBfQUxJQVNFUzogYCR7QkFTRV9BUElfUEFUSH0vX2FsaWFzZXNgLFxuICBfTUFQUElOR1M6IGAke0JBU0VfQVBJX1BBVEh9L19tYXBwaW5nc2AsXG4gIEFQUExZX1BPTElDWTogYCR7QkFTRV9BUElfUEFUSH0vYXBwbHlQb2xpY3lgLFxuICBFRElUX1JPTExPVkVSX0FMSUFTOiBgJHtCQVNFX0FQSV9QQVRIfS9lZGl0Um9sbG92ZXJBbGlhc2AsXG4gIFBPTElDSUVTOiBgJHtCQVNFX0FQSV9QQVRIfS9wb2xpY2llc2AsXG4gIF9SRUNPVkVSWTogYCR7QkFTRV9BUElfUEFUSH0vX3JlY292ZXJ5YCxcbiAgUk9MTFVQUzogYCR7QkFTRV9BUElfUEFUSH0vcm9sbHVwc2AsXG4gIFRSQU5TRk9STVM6IGAke0JBU0VfQVBJX1BBVEh9L3RyYW5zZm9ybXNgLFxuICBNQU5BR0VEX0lORElDRVM6IGAke0JBU0VfQVBJX1BBVEh9L21hbmFnZWRJbmRpY2VzYCxcbiAgQ0hBTk5FTFM6IGAke0JBU0VfQVBJX1BBVEh9L19ub3RpZmljYXRpb25zL2NoYW5uZWxzYCxcbiAgUkVUUlk6IGAke0JBU0VfQVBJX1BBVEh9L3JldHJ5YCxcbiAgQ0hBTkdFX1BPTElDWTogYCR7QkFTRV9BUElfUEFUSH0vY2hhbmdlUG9saWN5YCxcbiAgUkVNT1ZFX1BPTElDWTogYCR7QkFTRV9BUElfUEFUSH0vcmVtb3ZlUG9saWN5YCxcbiAgU01Qb2xpY2llczogYCR7QkFTRV9BUElfUEFUSH0vc21Qb2xpY2llc2AsXG4gIF9TTkFQU0hPVFM6IGAke0JBU0VfQVBJX1BBVEh9L19zbmFwc2hvdHNgLFxuICBfUkVQT1NJVE9SSUVTOiBgJHtCQVNFX0FQSV9QQVRIfS9fcmVwb3NpdG9yZXNgLFxuICBQVVRfSU5ERVg6IGAke0JBU0VfQVBJX1BBVEh9L3B1dEluZGV4YCxcbiAgQVBJX0NBTExFUjogYCR7QkFTRV9BUElfUEFUSH0vYXBpQ2FsbGVyYCxcbn0pO1xuXG5leHBvcnQgY29uc3QgUkVRVUVTVCA9IE9iamVjdC5mcmVlemUoe1xuICBQVVQ6IFwiUFVUXCIsXG4gIERFTEVURTogXCJERUxFVEVcIixcbiAgR0VUOiBcIkdFVFwiLFxuICBQT1NUOiBcIlBPU1RcIixcbiAgSEVBRDogXCJIRUFEXCIsXG59KTtcblxuZXhwb3J0IGNvbnN0IFNZU1RFTV9JTkRFWCA9IFtcbiAgXCIucGx1Z2lucy1tbC1tb2RlbFwiLFxuICBcIi5wbHVnaW5zLW1sLXRhc2tcIixcbiAgXCIub3BlbmRpc3Ryby1hbGVydGluZy1jb25maWdcIixcbiAgXCIub3BlbmRpc3Ryby1hbGVydGluZy1hbGVydCpcIixcbiAgXCIub3BlbmRpc3Ryby1hbm9tYWx5LXJlc3VsdHMqXCIsXG4gIFwiLm9wZW5kaXN0cm8tYW5vbWFseS1kZXRlY3RvcipcIixcbiAgXCIub3BlbmRpc3Ryby1hbm9tYWx5LWNoZWNrcG9pbnRzXCIsXG4gIFwiLm9wZW5kaXN0cm8tYW5vbWFseS1kZXRlY3Rpb24tc3RhdGVcIixcbiAgXCIub3BlbmRpc3Ryby1yZXBvcnRzLSpcIixcbiAgXCIub3BlbnNlYXJjaC1ub3RpZmljYXRpb25zLSpcIixcbiAgXCIub3BlbnNlYXJjaC1ub3RlYm9va3NcIixcbiAgXCIub3BlbnNlYXJjaC1vYnNlcnZhYmlsaXR5XCIsXG4gIFwiLm9wZW5kaXN0cm8tYXN5bmNocm9ub3VzLXNlYXJjaC1yZXNwb25zZSpcIixcbiAgXCIub3BlbmRpc3Ryb19zZWN1cml0eVwiLFxuICBcIi5vcGVuZGlzdHJvLWpvYi1zY2hlZHVsZXItbG9ja1wiLFxuICBcIi5vcGVuZGlzdHJvLWlzbS1jb25maWdcIixcbiAgXCIucmVwbGljYXRpb24tbWV0YWRhdGEtc3RvcmVcIixcbiAgXCJraWJhbmEqXCIsXG4gIFwiLmtpYmFuYSpcIixcbiAgXCIudGFza3NcIixcbl07XG5cbmV4cG9ydCBjb25zdCBTWVNURU1fQUxJQVMgPSBbXCIucGx1Z2lucypcIiwgXCIub3BlbmRpc3RybypcIiwgXCIub3BlbnNlYXJjaCpcIiwgXCIucmVwbGljYXRpb24tbWV0YWRhdGEtc3RvcmVcIiwgXCJraWJhbmEqXCIsIFwiLmtpYmFuYSpcIiwgXCIudGFza3Nc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