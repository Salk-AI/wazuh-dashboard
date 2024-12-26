"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _common = require("../../common");
var _helpers = require("./utils/helpers");
var _metricHelper = require("./utils/metricHelper");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

function _default(router) {
  router.get({
    path: `${_common.API_PREFIX}/stats`,
    validate: false
  }, async (context, request, response) => {
    //@ts-ignore
    const logger = context.reporting_plugin.logger;
    try {
      const metrics = (0, _metricHelper.getMetrics)();
      return response.ok({
        body: metrics
      });
    } catch (error) {
      logger.error(`failed during query reporting stats: ${error}`);
      return (0, _helpers.errorResponse)(response, error);
    }
  });
}
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29tbW9uIiwicmVxdWlyZSIsIl9oZWxwZXJzIiwiX21ldHJpY0hlbHBlciIsIl9kZWZhdWx0Iiwicm91dGVyIiwiZ2V0IiwicGF0aCIsIkFQSV9QUkVGSVgiLCJ2YWxpZGF0ZSIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJsb2dnZXIiLCJyZXBvcnRpbmdfcGx1Z2luIiwibWV0cmljcyIsImdldE1ldHJpY3MiLCJvayIsImJvZHkiLCJlcnJvciIsImVycm9yUmVzcG9uc2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIm1ldHJpYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlLFxuICBJUm91dGVyLFxuICBSZXNwb25zZUVycm9yLFxufSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgQVBJX1BSRUZJWCB9IGZyb20gJy4uLy4uL2NvbW1vbic7XG5pbXBvcnQgeyBlcnJvclJlc3BvbnNlIH0gZnJvbSAnLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7IGdldE1ldHJpY3MgfSBmcm9tICcuL3V0aWxzL21ldHJpY0hlbHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyb3V0ZXI6IElSb3V0ZXIpIHtcbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS9zdGF0c2AsXG4gICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgfSxcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0LFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxhbnkgfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgICAgLy9AdHMtaWdub3JlXG4gICAgICBjb25zdCBsb2dnZXI6IExvZ2dlciA9IGNvbnRleHQucmVwb3J0aW5nX3BsdWdpbi5sb2dnZXI7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXRyaWNzID0gZ2V0TWV0cmljcygpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IG1ldHJpY3MsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBmYWlsZWQgZHVyaW5nIHF1ZXJ5IHJlcG9ydGluZyBzdGF0czogJHtlcnJvcn1gKTtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQVVBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLFFBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLGFBQUEsR0FBQUYsT0FBQTtBQVpBO0FBQ0E7QUFDQTtBQUNBOztBQVdlLFNBQUFHLFNBQVVDLE1BQWUsRUFBRTtFQUN4Q0EsTUFBTSxDQUFDQyxHQUFHLENBQ1I7SUFDRUMsSUFBSSxFQUFHLEdBQUVDLGtCQUFXLFFBQU87SUFDM0JDLFFBQVEsRUFBRTtFQUNaLENBQUMsRUFDRCxPQUNFQyxPQUFPLEVBQ1BDLE9BQU8sRUFDUEMsUUFBUSxLQUN3RDtJQUNoRTtJQUNBLE1BQU1DLE1BQWMsR0FBR0gsT0FBTyxDQUFDSSxnQkFBZ0IsQ0FBQ0QsTUFBTTtJQUN0RCxJQUFJO01BQ0YsTUFBTUUsT0FBTyxHQUFHLElBQUFDLHdCQUFVLEVBQUMsQ0FBQztNQUM1QixPQUFPSixRQUFRLENBQUNLLEVBQUUsQ0FBQztRQUNqQkMsSUFBSSxFQUFFSDtNQUNSLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxPQUFPSSxLQUFLLEVBQUU7TUFDZE4sTUFBTSxDQUFDTSxLQUFLLENBQUUsd0NBQXVDQSxLQUFNLEVBQUMsQ0FBQztNQUM3RCxPQUFPLElBQUFDLHNCQUFhLEVBQUNSLFFBQVEsRUFBRU8sS0FBSyxDQUFDO0lBQ3ZDO0VBQ0YsQ0FDRixDQUFDO0FBQ0g7QUFBQ0UsTUFBQSxDQUFBQyxPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsT0FBQSJ9