"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _configSchema = require("@osd/config-schema");
var _constants = require("../../utils/constants");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

function _default(services, router) {
  const {
    policyService
  } = services;
  router.get({
    path: _constants.NODE_API.POLICIES,
    validate: {
      query: _configSchema.schema.object({
        from: _configSchema.schema.number(),
        size: _configSchema.schema.number(),
        search: _configSchema.schema.string(),
        sortField: _configSchema.schema.string(),
        sortDirection: _configSchema.schema.string()
      })
    }
  }, policyService.getPolicies);
  router.put({
    path: `${_constants.NODE_API.POLICIES}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      }),
      query: _configSchema.schema.object({
        seqNo: _configSchema.schema.maybe(_configSchema.schema.number()),
        primaryTerm: _configSchema.schema.maybe(_configSchema.schema.number())
      }),
      body: _configSchema.schema.any()
    }
  }, policyService.putPolicy);
  router.get({
    path: `${_constants.NODE_API.POLICIES}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, policyService.getPolicy);
  router.delete({
    path: `${_constants.NODE_API.POLICIES}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, policyService.deletePolicy);
}
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9jb25zdGFudHMiLCJfZGVmYXVsdCIsInNlcnZpY2VzIiwicm91dGVyIiwicG9saWN5U2VydmljZSIsImdldCIsInBhdGgiLCJOT0RFX0FQSSIsIlBPTElDSUVTIiwidmFsaWRhdGUiLCJxdWVyeSIsInNjaGVtYSIsIm9iamVjdCIsImZyb20iLCJudW1iZXIiLCJzaXplIiwic2VhcmNoIiwic3RyaW5nIiwic29ydEZpZWxkIiwic29ydERpcmVjdGlvbiIsImdldFBvbGljaWVzIiwicHV0IiwicGFyYW1zIiwiaWQiLCJzZXFObyIsIm1heWJlIiwicHJpbWFyeVRlcm0iLCJib2R5IiwiYW55IiwicHV0UG9saWN5IiwiZ2V0UG9saWN5IiwiZGVsZXRlIiwiZGVsZXRlUG9saWN5IiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiXSwic291cmNlcyI6WyJwb2xpY2llcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IElSb3V0ZXIgfSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlclwiO1xuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSBcIkBvc2QvY29uZmlnLXNjaGVtYVwiO1xuaW1wb3J0IHsgTm9kZVNlcnZpY2VzIH0gZnJvbSBcIi4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBOT0RFX0FQSSB9IGZyb20gXCIuLi8uLi91dGlscy9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlcnZpY2VzOiBOb2RlU2VydmljZXMsIHJvdXRlcjogSVJvdXRlcikge1xuICBjb25zdCB7IHBvbGljeVNlcnZpY2UgfSA9IHNlcnZpY2VzO1xuXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogTk9ERV9BUEkuUE9MSUNJRVMsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgZnJvbTogc2NoZW1hLm51bWJlcigpLFxuICAgICAgICAgIHNpemU6IHNjaGVtYS5udW1iZXIoKSxcbiAgICAgICAgICBzZWFyY2g6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICBzb3J0RmllbGQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICBzb3J0RGlyZWN0aW9uOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBvbGljeVNlcnZpY2UuZ2V0UG9saWNpZXNcbiAgKTtcblxuICByb3V0ZXIucHV0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke05PREVfQVBJLlBPTElDSUVTfS97aWR9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgaWQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5OiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICBzZXFObzogc2NoZW1hLm1heWJlKHNjaGVtYS5udW1iZXIoKSksXG4gICAgICAgICAgcHJpbWFyeVRlcm06IHNjaGVtYS5tYXliZShzY2hlbWEubnVtYmVyKCkpLFxuICAgICAgICB9KSxcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBvbGljeVNlcnZpY2UucHV0UG9saWN5XG4gICk7XG5cbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtOT0RFX0FQSS5QT0xJQ0lFU30ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBvbGljeVNlcnZpY2UuZ2V0UG9saWN5XG4gICk7XG5cbiAgcm91dGVyLmRlbGV0ZShcbiAgICB7XG4gICAgICBwYXRoOiBgJHtOT0RFX0FQSS5QT0xJQ0lFU30ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBvbGljeVNlcnZpY2UuZGVsZXRlUG9saWN5XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLElBQUFBLGFBQUEsR0FBQUMsT0FBQTtBQUVBLElBQUFDLFVBQUEsR0FBQUQsT0FBQTtBQVJBO0FBQ0E7QUFDQTtBQUNBOztBQU9lLFNBQUFFLFNBQVVDLFFBQXNCLEVBQUVDLE1BQWUsRUFBRTtFQUNoRSxNQUFNO0lBQUVDO0VBQWMsQ0FBQyxHQUFHRixRQUFRO0VBRWxDQyxNQUFNLENBQUNFLEdBQUcsQ0FDUjtJQUNFQyxJQUFJLEVBQUVDLG1CQUFRLENBQUNDLFFBQVE7SUFDdkJDLFFBQVEsRUFBRTtNQUNSQyxLQUFLLEVBQUVDLG9CQUFNLENBQUNDLE1BQU0sQ0FBQztRQUNuQkMsSUFBSSxFQUFFRixvQkFBTSxDQUFDRyxNQUFNLENBQUMsQ0FBQztRQUNyQkMsSUFBSSxFQUFFSixvQkFBTSxDQUFDRyxNQUFNLENBQUMsQ0FBQztRQUNyQkUsTUFBTSxFQUFFTCxvQkFBTSxDQUFDTSxNQUFNLENBQUMsQ0FBQztRQUN2QkMsU0FBUyxFQUFFUCxvQkFBTSxDQUFDTSxNQUFNLENBQUMsQ0FBQztRQUMxQkUsYUFBYSxFQUFFUixvQkFBTSxDQUFDTSxNQUFNLENBQUM7TUFDL0IsQ0FBQztJQUNIO0VBQ0YsQ0FBQyxFQUNEYixhQUFhLENBQUNnQixXQUNoQixDQUFDO0VBRURqQixNQUFNLENBQUNrQixHQUFHLENBQ1I7SUFDRWYsSUFBSSxFQUFHLEdBQUVDLG1CQUFRLENBQUNDLFFBQVMsT0FBTTtJQUNqQ0MsUUFBUSxFQUFFO01BQ1JhLE1BQU0sRUFBRVgsb0JBQU0sQ0FBQ0MsTUFBTSxDQUFDO1FBQ3BCVyxFQUFFLEVBQUVaLG9CQUFNLENBQUNNLE1BQU0sQ0FBQztNQUNwQixDQUFDLENBQUM7TUFDRlAsS0FBSyxFQUFFQyxvQkFBTSxDQUFDQyxNQUFNLENBQUM7UUFDbkJZLEtBQUssRUFBRWIsb0JBQU0sQ0FBQ2MsS0FBSyxDQUFDZCxvQkFBTSxDQUFDRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BDWSxXQUFXLEVBQUVmLG9CQUFNLENBQUNjLEtBQUssQ0FBQ2Qsb0JBQU0sQ0FBQ0csTUFBTSxDQUFDLENBQUM7TUFDM0MsQ0FBQyxDQUFDO01BQ0ZhLElBQUksRUFBRWhCLG9CQUFNLENBQUNpQixHQUFHLENBQUM7SUFDbkI7RUFDRixDQUFDLEVBQ0R4QixhQUFhLENBQUN5QixTQUNoQixDQUFDO0VBRUQxQixNQUFNLENBQUNFLEdBQUcsQ0FDUjtJQUNFQyxJQUFJLEVBQUcsR0FBRUMsbUJBQVEsQ0FBQ0MsUUFBUyxPQUFNO0lBQ2pDQyxRQUFRLEVBQUU7TUFDUmEsTUFBTSxFQUFFWCxvQkFBTSxDQUFDQyxNQUFNLENBQUM7UUFDcEJXLEVBQUUsRUFBRVosb0JBQU0sQ0FBQ00sTUFBTSxDQUFDO01BQ3BCLENBQUM7SUFDSDtFQUNGLENBQUMsRUFDRGIsYUFBYSxDQUFDMEIsU0FDaEIsQ0FBQztFQUVEM0IsTUFBTSxDQUFDNEIsTUFBTSxDQUNYO0lBQ0V6QixJQUFJLEVBQUcsR0FBRUMsbUJBQVEsQ0FBQ0MsUUFBUyxPQUFNO0lBQ2pDQyxRQUFRLEVBQUU7TUFDUmEsTUFBTSxFQUFFWCxvQkFBTSxDQUFDQyxNQUFNLENBQUM7UUFDcEJXLEVBQUUsRUFBRVosb0JBQU0sQ0FBQ00sTUFBTSxDQUFDO01BQ3BCLENBQUM7SUFDSDtFQUNGLENBQUMsRUFDRGIsYUFBYSxDQUFDNEIsWUFDaEIsQ0FBQztBQUNIO0FBQUNDLE1BQUEsQ0FBQUMsT0FBQSxHQUFBQSxPQUFBLENBQUFDLE9BQUEifQ==