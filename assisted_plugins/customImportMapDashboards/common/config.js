"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = void 0;
var _configSchema = require("@osd/config-schema");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const configSchema = exports.configSchema = _configSchema.schema.object({
  opensearchVectorTileDataUrl: _configSchema.schema.string({
    defaultValue: 'https://tiles.maps.opensearch.org/data/v1.json'
  }),
  opensearchVectorTileStyleUrl: _configSchema.schema.string({
    defaultValue: 'https://tiles.maps.opensearch.org/v3/manifest.json'
  }),
  opensearchVectorTileGlyphsUrl: _configSchema.schema.string({
    defaultValue: 'https://tiles.maps.opensearch.org/fonts/{fontstack}/{range}.pbf'
  })
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsImNvbmZpZ1NjaGVtYSIsImV4cG9ydHMiLCJzY2hlbWEiLCJvYmplY3QiLCJvcGVuc2VhcmNoVmVjdG9yVGlsZURhdGFVcmwiLCJzdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvcGVuc2VhcmNoVmVjdG9yVGlsZVN0eWxlVXJsIiwib3BlbnNlYXJjaFZlY3RvclRpbGVHbHlwaHNVcmwiXSwic291cmNlcyI6WyJjb25maWcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBzY2hlbWEsIFR5cGVPZiB9IGZyb20gJ0Bvc2QvY29uZmlnLXNjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBjb25maWdTY2hlbWEgPSBzY2hlbWEub2JqZWN0KHtcbiAgb3BlbnNlYXJjaFZlY3RvclRpbGVEYXRhVXJsOiBzY2hlbWEuc3RyaW5nKHtcbiAgICBkZWZhdWx0VmFsdWU6ICdodHRwczovL3RpbGVzLm1hcHMub3BlbnNlYXJjaC5vcmcvZGF0YS92MS5qc29uJyxcbiAgfSksXG4gIG9wZW5zZWFyY2hWZWN0b3JUaWxlU3R5bGVVcmw6IHNjaGVtYS5zdHJpbmcoe1xuICAgIGRlZmF1bHRWYWx1ZTogJ2h0dHBzOi8vdGlsZXMubWFwcy5vcGVuc2VhcmNoLm9yZy92My9tYW5pZmVzdC5qc29uJyxcbiAgfSksXG4gIG9wZW5zZWFyY2hWZWN0b3JUaWxlR2x5cGhzVXJsOiBzY2hlbWEuc3RyaW5nKHtcbiAgICBkZWZhdWx0VmFsdWU6ICdodHRwczovL3RpbGVzLm1hcHMub3BlbnNlYXJjaC5vcmcvZm9udHMve2ZvbnRzdGFja30ve3JhbmdlfS5wYmYnLFxuICB9KSxcbn0pO1xuXG5leHBvcnQgdHlwZSBDb25maWdTY2hlbWEgPSBUeXBlT2Y8dHlwZW9mIGNvbmZpZ1NjaGVtYT47XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLElBQUFBLGFBQUEsR0FBQUMsT0FBQTtBQUxBO0FBQ0E7QUFDQTtBQUNBOztBQUlPLE1BQU1DLFlBQVksR0FBQUMsT0FBQSxDQUFBRCxZQUFBLEdBQUdFLG9CQUFNLENBQUNDLE1BQU0sQ0FBQztFQUN4Q0MsMkJBQTJCLEVBQUVGLG9CQUFNLENBQUNHLE1BQU0sQ0FBQztJQUN6Q0MsWUFBWSxFQUFFO0VBQ2hCLENBQUMsQ0FBQztFQUNGQyw0QkFBNEIsRUFBRUwsb0JBQU0sQ0FBQ0csTUFBTSxDQUFDO0lBQzFDQyxZQUFZLEVBQUU7RUFDaEIsQ0FBQyxDQUFDO0VBQ0ZFLDZCQUE2QixFQUFFTixvQkFBTSxDQUFDRyxNQUFNLENBQUM7SUFDM0NDLFlBQVksRUFBRTtFQUNoQixDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=