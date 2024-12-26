"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _configSchema = require("@osd/config-schema");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

function _default(services, router) {
  const {
    opensearchService
  } = services;
  router.post({
    path: '/api/alerting/_search',
    validate: {
      body: _configSchema.schema.any()
    }
  }, opensearchService.search);
  router.post({
    path: '/api/alerting/_indices',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string()
      })
    }
  }, opensearchService.getIndices);
  router.post({
    path: '/api/alerting/_aliases',
    validate: {
      body: _configSchema.schema.object({
        alias: _configSchema.schema.string()
      })
    }
  }, opensearchService.getAliases);
  router.post({
    path: '/api/alerting/_mappings',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.arrayOf(_configSchema.schema.string())
      })
    }
  }, opensearchService.getMappings);
  router.get({
    path: '/api/alerting/_plugins',
    validate: false
  }, opensearchService.getPlugins);
  router.get({
    path: '/api/alerting/_settings',
    validate: false
  }, opensearchService.getSettings);
  router.get({
    path: '/api/alerting/_health',
    validate: false
  }, opensearchService.getClusterHealth);
}
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9kZWZhdWx0Iiwic2VydmljZXMiLCJyb3V0ZXIiLCJvcGVuc2VhcmNoU2VydmljZSIsInBvc3QiLCJwYXRoIiwidmFsaWRhdGUiLCJib2R5Iiwic2NoZW1hIiwiYW55Iiwic2VhcmNoIiwib2JqZWN0IiwiaW5kZXgiLCJzdHJpbmciLCJnZXRJbmRpY2VzIiwiYWxpYXMiLCJnZXRBbGlhc2VzIiwiYXJyYXlPZiIsImdldE1hcHBpbmdzIiwiZ2V0IiwiZ2V0UGx1Z2lucyIsImdldFNldHRpbmdzIiwiZ2V0Q2x1c3RlckhlYWx0aCIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsib3BlbnNlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJ0Bvc2QvY29uZmlnLXNjaGVtYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZXJ2aWNlcywgcm91dGVyKSB7XG4gIGNvbnN0IHsgb3BlbnNlYXJjaFNlcnZpY2UgfSA9IHNlcnZpY2VzO1xuXG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYXBpL2FsZXJ0aW5nL19zZWFyY2gnLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wZW5zZWFyY2hTZXJ2aWNlLnNlYXJjaFxuICApO1xuXG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYXBpL2FsZXJ0aW5nL19pbmRpY2VzJyxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGJvZHk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGluZGV4OiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wZW5zZWFyY2hTZXJ2aWNlLmdldEluZGljZXNcbiAgKTtcblxuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiAnL2FwaS9hbGVydGluZy9fYWxpYXNlcycsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBib2R5OiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICBhbGlhczogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvcGVuc2VhcmNoU2VydmljZS5nZXRBbGlhc2VzXG4gICk7XG5cbiAgcm91dGVyLnBvc3QoXG4gICAge1xuICAgICAgcGF0aDogJy9hcGkvYWxlcnRpbmcvX21hcHBpbmdzJyxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGJvZHk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGluZGV4OiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCkpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvcGVuc2VhcmNoU2VydmljZS5nZXRNYXBwaW5nc1xuICApO1xuXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogJy9hcGkvYWxlcnRpbmcvX3BsdWdpbnMnLFxuICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgb3BlbnNlYXJjaFNlcnZpY2UuZ2V0UGx1Z2luc1xuICApO1xuXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogJy9hcGkvYWxlcnRpbmcvX3NldHRpbmdzJyxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIG9wZW5zZWFyY2hTZXJ2aWNlLmdldFNldHRpbmdzXG4gICk7XG5cbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiAnL2FwaS9hbGVydGluZy9faGVhbHRoJyxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIG9wZW5zZWFyY2hTZXJ2aWNlLmdldENsdXN0ZXJIZWFsdGhcbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsSUFBQUEsYUFBQSxHQUFBQyxPQUFBO0FBTEE7QUFDQTtBQUNBO0FBQ0E7O0FBSWUsU0FBQUMsU0FBVUMsUUFBUSxFQUFFQyxNQUFNLEVBQUU7RUFDekMsTUFBTTtJQUFFQztFQUFrQixDQUFDLEdBQUdGLFFBQVE7RUFFdENDLE1BQU0sQ0FBQ0UsSUFBSSxDQUNUO0lBQ0VDLElBQUksRUFBRSx1QkFBdUI7SUFDN0JDLFFBQVEsRUFBRTtNQUNSQyxJQUFJLEVBQUVDLG9CQUFNLENBQUNDLEdBQUcsQ0FBQztJQUNuQjtFQUNGLENBQUMsRUFDRE4saUJBQWlCLENBQUNPLE1BQ3BCLENBQUM7RUFFRFIsTUFBTSxDQUFDRSxJQUFJLENBQ1Q7SUFDRUMsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QkMsUUFBUSxFQUFFO01BQ1JDLElBQUksRUFBRUMsb0JBQU0sQ0FBQ0csTUFBTSxDQUFDO1FBQ2xCQyxLQUFLLEVBQUVKLG9CQUFNLENBQUNLLE1BQU0sQ0FBQztNQUN2QixDQUFDO0lBQ0g7RUFDRixDQUFDLEVBQ0RWLGlCQUFpQixDQUFDVyxVQUNwQixDQUFDO0VBRURaLE1BQU0sQ0FBQ0UsSUFBSSxDQUNUO0lBQ0VDLElBQUksRUFBRSx3QkFBd0I7SUFDOUJDLFFBQVEsRUFBRTtNQUNSQyxJQUFJLEVBQUVDLG9CQUFNLENBQUNHLE1BQU0sQ0FBQztRQUNsQkksS0FBSyxFQUFFUCxvQkFBTSxDQUFDSyxNQUFNLENBQUM7TUFDdkIsQ0FBQztJQUNIO0VBQ0YsQ0FBQyxFQUNEVixpQkFBaUIsQ0FBQ2EsVUFDcEIsQ0FBQztFQUVEZCxNQUFNLENBQUNFLElBQUksQ0FDVDtJQUNFQyxJQUFJLEVBQUUseUJBQXlCO0lBQy9CQyxRQUFRLEVBQUU7TUFDUkMsSUFBSSxFQUFFQyxvQkFBTSxDQUFDRyxNQUFNLENBQUM7UUFDbEJDLEtBQUssRUFBRUosb0JBQU0sQ0FBQ1MsT0FBTyxDQUFDVCxvQkFBTSxDQUFDSyxNQUFNLENBQUMsQ0FBQztNQUN2QyxDQUFDO0lBQ0g7RUFDRixDQUFDLEVBQ0RWLGlCQUFpQixDQUFDZSxXQUNwQixDQUFDO0VBRURoQixNQUFNLENBQUNpQixHQUFHLENBQ1I7SUFDRWQsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QkMsUUFBUSxFQUFFO0VBQ1osQ0FBQyxFQUNESCxpQkFBaUIsQ0FBQ2lCLFVBQ3BCLENBQUM7RUFFRGxCLE1BQU0sQ0FBQ2lCLEdBQUcsQ0FDUjtJQUNFZCxJQUFJLEVBQUUseUJBQXlCO0lBQy9CQyxRQUFRLEVBQUU7RUFDWixDQUFDLEVBQ0RILGlCQUFpQixDQUFDa0IsV0FDcEIsQ0FBQztFQUVEbkIsTUFBTSxDQUFDaUIsR0FBRyxDQUNSO0lBQ0VkLElBQUksRUFBRSx1QkFBdUI7SUFDN0JDLFFBQVEsRUFBRTtFQUNaLENBQUMsRUFDREgsaUJBQWlCLENBQUNtQixnQkFDcEIsQ0FBQztBQUNIO0FBQUNDLE1BQUEsQ0FBQUMsT0FBQSxHQUFBQSxPQUFBLENBQUFDLE9BQUEifQ==