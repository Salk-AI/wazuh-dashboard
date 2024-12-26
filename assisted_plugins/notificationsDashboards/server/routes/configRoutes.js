"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoutes = configRoutes;
var _configSchema = require("@osd/config-schema");
var _common = require("../../common");
var _helper = require("../utils/helper");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

function configRoutes(router) {
  router.get({
    path: _common.NODE_API.GET_CONFIGS,
    validate: {
      query: _configSchema.schema.object({
        from_index: _configSchema.schema.number(),
        max_items: _configSchema.schema.number(),
        query: _configSchema.schema.maybe(_configSchema.schema.string()),
        config_type: _configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), _configSchema.schema.string()]),
        is_enabled: _configSchema.schema.maybe(_configSchema.schema.boolean()),
        sort_field: _configSchema.schema.string(),
        sort_order: _configSchema.schema.string(),
        config_id_list: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), _configSchema.schema.string()])),
        'smtp_account.method': _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), _configSchema.schema.string()]))
      })
    }
  }, async (context, request, response) => {
    const config_type = (0, _helper.joinRequestParams)(request.query.config_type);
    const config_id_list = (0, _helper.joinRequestParams)(request.query.config_id_list);
    const encryption_method = (0, _helper.joinRequestParams)(request.query['smtp_account.method']);
    const query = request.query.query;
    // @ts-ignore
    const client = context.notificationsContext.notificationsClient.asScoped(request);
    try {
      const resp = await client.callAsCurrentUser('notifications.getConfigs', {
        from_index: request.query.from_index,
        max_items: request.query.max_items,
        is_enabled: request.query.is_enabled,
        sort_field: request.query.sort_field,
        sort_order: request.query.sort_order,
        config_type,
        ...(query && {
          text_query: query
        }),
        // text_query will exclude keyword fields
        ...(config_id_list && {
          config_id_list
        }),
        ...(encryption_method && {
          'smtp_account.method': encryption_method
        })
      });
      return response.ok({
        body: resp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      });
    }
  });
  router.get({
    path: `${_common.NODE_API.GET_CONFIG}/{configId}`,
    validate: {
      params: _configSchema.schema.object({
        configId: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    // @ts-ignore
    const client = context.notificationsContext.notificationsClient.asScoped(request);
    try {
      const resp = await client.callAsCurrentUser('notifications.getConfigById', {
        configId: request.params.configId
      });
      return response.ok({
        body: resp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      });
    }
  });
  router.post({
    path: _common.NODE_API.CREATE_CONFIG,
    validate: {
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    // @ts-ignore
    const client = context.notificationsContext.notificationsClient.asScoped(request);
    try {
      const resp = await client.callAsCurrentUser('notifications.createConfig', {
        body: request.body
      });
      return response.ok({
        body: resp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      });
    }
  });
  router.put({
    path: `${_common.NODE_API.UPDATE_CONFIG}/{configId}`,
    validate: {
      body: _configSchema.schema.any(),
      params: _configSchema.schema.object({
        configId: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    // @ts-ignore
    const client = context.notificationsContext.notificationsClient.asScoped(request);
    try {
      const resp = await client.callAsCurrentUser('notifications.updateConfigById', {
        configId: request.params.configId,
        body: request.body
      });
      return response.ok({
        body: resp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      });
    }
  });
  router.delete({
    path: _common.NODE_API.DELETE_CONFIGS,
    validate: {
      query: _configSchema.schema.object({
        config_id_list: _configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), _configSchema.schema.string()])
      })
    }
  }, async (context, request, response) => {
    // @ts-ignore
    const client = context.notificationsContext.notificationsClient.asScoped(request);
    const config_id_list = (0, _helper.joinRequestParams)(request.query.config_id_list);
    try {
      const resp = await client.callAsCurrentUser('notifications.deleteConfigs', {
        config_id_list
      });
      return response.ok({
        body: resp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      });
    }
  });
  router.get({
    path: _common.NODE_API.GET_AVAILABLE_FEATURES,
    validate: false
  }, async (context, request, response) => {
    // @ts-ignore
    const client = context.notificationsContext.notificationsClient.asScoped(request);
    try {
      const resp = await client.callAsCurrentUser('notifications.getServerFeatures');
      return response.ok({
        body: resp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      });
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9jb21tb24iLCJfaGVscGVyIiwiY29uZmlnUm91dGVzIiwicm91dGVyIiwiZ2V0IiwicGF0aCIsIk5PREVfQVBJIiwiR0VUX0NPTkZJR1MiLCJ2YWxpZGF0ZSIsInF1ZXJ5Iiwic2NoZW1hIiwib2JqZWN0IiwiZnJvbV9pbmRleCIsIm51bWJlciIsIm1heF9pdGVtcyIsIm1heWJlIiwic3RyaW5nIiwiY29uZmlnX3R5cGUiLCJvbmVPZiIsImFycmF5T2YiLCJpc19lbmFibGVkIiwiYm9vbGVhbiIsInNvcnRfZmllbGQiLCJzb3J0X29yZGVyIiwiY29uZmlnX2lkX2xpc3QiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiam9pblJlcXVlc3RQYXJhbXMiLCJlbmNyeXB0aW9uX21ldGhvZCIsImNsaWVudCIsIm5vdGlmaWNhdGlvbnNDb250ZXh0Iiwibm90aWZpY2F0aW9uc0NsaWVudCIsImFzU2NvcGVkIiwicmVzcCIsImNhbGxBc0N1cnJlbnRVc2VyIiwidGV4dF9xdWVyeSIsIm9rIiwiYm9keSIsImVycm9yIiwiY3VzdG9tIiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiLCJHRVRfQ09ORklHIiwicGFyYW1zIiwiY29uZmlnSWQiLCJwb3N0IiwiQ1JFQVRFX0NPTkZJRyIsImFueSIsInB1dCIsIlVQREFURV9DT05GSUciLCJkZWxldGUiLCJERUxFVEVfQ09ORklHUyIsIkdFVF9BVkFJTEFCTEVfRkVBVFVSRVMiXSwic291cmNlcyI6WyJjb25maWdSb3V0ZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBzY2hlbWEgfSBmcm9tICdAb3NkL2NvbmZpZy1zY2hlbWEnO1xuaW1wb3J0IHtcbiAgSUxlZ2FjeVNjb3BlZENsdXN0ZXJDbGllbnQsXG4gIElSb3V0ZXIsXG59IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBOT0RFX0FQSSB9IGZyb20gJy4uLy4uL2NvbW1vbic7XG5pbXBvcnQgeyBqb2luUmVxdWVzdFBhcmFtcyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdSb3V0ZXMocm91dGVyOiBJUm91dGVyKSB7XG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogTk9ERV9BUEkuR0VUX0NPTkZJR1MsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgZnJvbV9pbmRleDogc2NoZW1hLm51bWJlcigpLFxuICAgICAgICAgIG1heF9pdGVtczogc2NoZW1hLm51bWJlcigpLFxuICAgICAgICAgIHF1ZXJ5OiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgICAgICBjb25maWdfdHlwZTogc2NoZW1hLm9uZU9mKFtcbiAgICAgICAgICAgIHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgICAgICAgICBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgICAgXSksXG4gICAgICAgICAgaXNfZW5hYmxlZDogc2NoZW1hLm1heWJlKHNjaGVtYS5ib29sZWFuKCkpLFxuICAgICAgICAgIHNvcnRfZmllbGQ6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICBzb3J0X29yZGVyOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgICAgY29uZmlnX2lkX2xpc3Q6IHNjaGVtYS5tYXliZShcbiAgICAgICAgICAgIHNjaGVtYS5vbmVPZihbc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpKSwgc2NoZW1hLnN0cmluZygpXSlcbiAgICAgICAgICApLFxuICAgICAgICAgICdzbXRwX2FjY291bnQubWV0aG9kJzogc2NoZW1hLm1heWJlKFxuICAgICAgICAgICAgc2NoZW1hLm9uZU9mKFtzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCkpLCBzY2hlbWEuc3RyaW5nKCldKVxuICAgICAgICAgICksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgY29uZmlnX3R5cGUgPSBqb2luUmVxdWVzdFBhcmFtcyhyZXF1ZXN0LnF1ZXJ5LmNvbmZpZ190eXBlKTtcbiAgICAgIGNvbnN0IGNvbmZpZ19pZF9saXN0ID0gam9pblJlcXVlc3RQYXJhbXMocmVxdWVzdC5xdWVyeS5jb25maWdfaWRfbGlzdCk7XG4gICAgICBjb25zdCBlbmNyeXB0aW9uX21ldGhvZCA9IGpvaW5SZXF1ZXN0UGFyYW1zKFxuICAgICAgICByZXF1ZXN0LnF1ZXJ5WydzbXRwX2FjY291bnQubWV0aG9kJ11cbiAgICAgICk7XG4gICAgICBjb25zdCBxdWVyeSA9IHJlcXVlc3QucXVlcnkucXVlcnk7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBjbGllbnQ6IElMZWdhY3lTY29wZWRDbHVzdGVyQ2xpZW50ID0gY29udGV4dC5ub3RpZmljYXRpb25zQ29udGV4dC5ub3RpZmljYXRpb25zQ2xpZW50LmFzU2NvcGVkKFxuICAgICAgICByZXF1ZXN0XG4gICAgICApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcihcbiAgICAgICAgICAnbm90aWZpY2F0aW9ucy5nZXRDb25maWdzJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tX2luZGV4OiByZXF1ZXN0LnF1ZXJ5LmZyb21faW5kZXgsXG4gICAgICAgICAgICBtYXhfaXRlbXM6IHJlcXVlc3QucXVlcnkubWF4X2l0ZW1zLFxuICAgICAgICAgICAgaXNfZW5hYmxlZDogcmVxdWVzdC5xdWVyeS5pc19lbmFibGVkLFxuICAgICAgICAgICAgc29ydF9maWVsZDogcmVxdWVzdC5xdWVyeS5zb3J0X2ZpZWxkLFxuICAgICAgICAgICAgc29ydF9vcmRlcjogcmVxdWVzdC5xdWVyeS5zb3J0X29yZGVyLFxuICAgICAgICAgICAgY29uZmlnX3R5cGUsXG4gICAgICAgICAgICAuLi4ocXVlcnkgJiYgeyB0ZXh0X3F1ZXJ5OiBxdWVyeSB9KSwgLy8gdGV4dF9xdWVyeSB3aWxsIGV4Y2x1ZGUga2V5d29yZCBmaWVsZHNcbiAgICAgICAgICAgIC4uLihjb25maWdfaWRfbGlzdCAmJiB7IGNvbmZpZ19pZF9saXN0IH0pLFxuICAgICAgICAgICAgLi4uKGVuY3J5cHRpb25fbWV0aG9kICYmIHtcbiAgICAgICAgICAgICAgJ3NtdHBfYWNjb3VudC5tZXRob2QnOiBlbmNyeXB0aW9uX21ldGhvZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHsgYm9keTogcmVzcCB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1c0NvZGUgfHwgNTAwLFxuICAgICAgICAgIGJvZHk6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke05PREVfQVBJLkdFVF9DT05GSUd9L3tjb25maWdJZH1gLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGFyYW1zOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICBjb25maWdJZDogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNvbnN0IGNsaWVudDogSUxlZ2FjeVNjb3BlZENsdXN0ZXJDbGllbnQgPSBjb250ZXh0Lm5vdGlmaWNhdGlvbnNDb250ZXh0Lm5vdGlmaWNhdGlvbnNDbGllbnQuYXNTY29wZWQoXG4gICAgICAgIHJlcXVlc3RcbiAgICAgICk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKFxuICAgICAgICAgICdub3RpZmljYXRpb25zLmdldENvbmZpZ0J5SWQnLFxuICAgICAgICAgIHsgY29uZmlnSWQ6IHJlcXVlc3QucGFyYW1zLmNvbmZpZ0lkIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHsgYm9keTogcmVzcCB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IGVycm9yLnN0YXR1c0NvZGUgfHwgNTAwLFxuICAgICAgICAgIGJvZHk6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBOT0RFX0FQSS5DUkVBVEVfQ09ORklHLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgY2xpZW50OiBJTGVnYWN5U2NvcGVkQ2x1c3RlckNsaWVudCA9IGNvbnRleHQubm90aWZpY2F0aW9uc0NvbnRleHQubm90aWZpY2F0aW9uc0NsaWVudC5hc1Njb3BlZChcbiAgICAgICAgcmVxdWVzdFxuICAgICAgKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoXG4gICAgICAgICAgJ25vdGlmaWNhdGlvbnMuY3JlYXRlQ29uZmlnJyxcbiAgICAgICAgICB7IGJvZHk6IHJlcXVlc3QuYm9keSB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7IGJvZHk6IHJlc3AgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiBlcnJvci5zdGF0dXNDb2RlIHx8IDUwMCxcbiAgICAgICAgICBib2R5OiBlcnJvci5tZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgcm91dGVyLnB1dChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtOT0RFX0FQSS5VUERBVEVfQ09ORklHfS97Y29uZmlnSWR9YCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgICAgcGFyYW1zOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICBjb25maWdJZDogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNvbnN0IGNsaWVudDogSUxlZ2FjeVNjb3BlZENsdXN0ZXJDbGllbnQgPSBjb250ZXh0Lm5vdGlmaWNhdGlvbnNDb250ZXh0Lm5vdGlmaWNhdGlvbnNDbGllbnQuYXNTY29wZWQoXG4gICAgICAgIHJlcXVlc3RcbiAgICAgICk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKFxuICAgICAgICAgICdub3RpZmljYXRpb25zLnVwZGF0ZUNvbmZpZ0J5SWQnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbmZpZ0lkOiByZXF1ZXN0LnBhcmFtcy5jb25maWdJZCxcbiAgICAgICAgICAgIGJvZHk6IHJlcXVlc3QuYm9keSxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7IGJvZHk6IHJlc3AgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiBlcnJvci5zdGF0dXNDb2RlIHx8IDUwMCxcbiAgICAgICAgICBib2R5OiBlcnJvci5tZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgcm91dGVyLmRlbGV0ZShcbiAgICB7XG4gICAgICBwYXRoOiBOT0RFX0FQSS5ERUxFVEVfQ09ORklHUyxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHF1ZXJ5OiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICBjb25maWdfaWRfbGlzdDogc2NoZW1hLm9uZU9mKFtcbiAgICAgICAgICAgIHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgICAgICAgICBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgICAgXSksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgY2xpZW50OiBJTGVnYWN5U2NvcGVkQ2x1c3RlckNsaWVudCA9IGNvbnRleHQubm90aWZpY2F0aW9uc0NvbnRleHQubm90aWZpY2F0aW9uc0NsaWVudC5hc1Njb3BlZChcbiAgICAgICAgcmVxdWVzdFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbmZpZ19pZF9saXN0ID0gam9pblJlcXVlc3RQYXJhbXMocmVxdWVzdC5xdWVyeS5jb25maWdfaWRfbGlzdCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKFxuICAgICAgICAgICdub3RpZmljYXRpb25zLmRlbGV0ZUNvbmZpZ3MnLFxuICAgICAgICAgIHsgY29uZmlnX2lkX2xpc3QgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soeyBib2R5OiByZXNwIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogZXJyb3Iuc3RhdHVzQ29kZSB8fCA1MDAsXG4gICAgICAgICAgYm9keTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogTk9ERV9BUEkuR0VUX0FWQUlMQUJMRV9GRUFUVVJFUyxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgY2xpZW50OiBJTGVnYWN5U2NvcGVkQ2x1c3RlckNsaWVudCA9IGNvbnRleHQubm90aWZpY2F0aW9uc0NvbnRleHQubm90aWZpY2F0aW9uc0NsaWVudC5hc1Njb3BlZChcbiAgICAgICAgcmVxdWVzdFxuICAgICAgKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoXG4gICAgICAgICAgJ25vdGlmaWNhdGlvbnMuZ2V0U2VydmVyRmVhdHVyZXMnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7IGJvZHk6IHJlc3AgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiBlcnJvci5zdGF0dXNDb2RlIHx8IDUwMCxcbiAgICAgICAgICBib2R5OiBlcnJvci5tZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLElBQUFBLGFBQUEsR0FBQUMsT0FBQTtBQUtBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLE9BQUEsR0FBQUYsT0FBQTtBQVhBO0FBQ0E7QUFDQTtBQUNBOztBQVVPLFNBQVNHLFlBQVlBLENBQUNDLE1BQWUsRUFBRTtFQUM1Q0EsTUFBTSxDQUFDQyxHQUFHLENBQ1I7SUFDRUMsSUFBSSxFQUFFQyxnQkFBUSxDQUFDQyxXQUFXO0lBQzFCQyxRQUFRLEVBQUU7TUFDUkMsS0FBSyxFQUFFQyxvQkFBTSxDQUFDQyxNQUFNLENBQUM7UUFDbkJDLFVBQVUsRUFBRUYsb0JBQU0sQ0FBQ0csTUFBTSxDQUFDLENBQUM7UUFDM0JDLFNBQVMsRUFBRUosb0JBQU0sQ0FBQ0csTUFBTSxDQUFDLENBQUM7UUFDMUJKLEtBQUssRUFBRUMsb0JBQU0sQ0FBQ0ssS0FBSyxDQUFDTCxvQkFBTSxDQUFDTSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BDQyxXQUFXLEVBQUVQLG9CQUFNLENBQUNRLEtBQUssQ0FBQyxDQUN4QlIsb0JBQU0sQ0FBQ1MsT0FBTyxDQUFDVCxvQkFBTSxDQUFDTSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQy9CTixvQkFBTSxDQUFDTSxNQUFNLENBQUMsQ0FBQyxDQUNoQixDQUFDO1FBQ0ZJLFVBQVUsRUFBRVYsb0JBQU0sQ0FBQ0ssS0FBSyxDQUFDTCxvQkFBTSxDQUFDVyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFDQyxVQUFVLEVBQUVaLG9CQUFNLENBQUNNLE1BQU0sQ0FBQyxDQUFDO1FBQzNCTyxVQUFVLEVBQUViLG9CQUFNLENBQUNNLE1BQU0sQ0FBQyxDQUFDO1FBQzNCUSxjQUFjLEVBQUVkLG9CQUFNLENBQUNLLEtBQUssQ0FDMUJMLG9CQUFNLENBQUNRLEtBQUssQ0FBQyxDQUFDUixvQkFBTSxDQUFDUyxPQUFPLENB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