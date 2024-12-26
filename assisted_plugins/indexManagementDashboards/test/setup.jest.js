"use strict";

require("@testing-library/jest-dom/extend-expect");
var _react = require("@testing-library/react");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

(0, _react.configure)({
  testIdAttribute: "data-test-subj",
  asyncUtilTimeout: 10000
});
jest.mock("@elastic/eui/lib/eui_components/form/form_row/make_id", () => () => "some_make_id");
jest.mock("@elastic/eui/lib/services/accessibility/html_id_generator", () => ({
  htmlIdGenerator: () => {
    return () => "some_html_id";
  }
}));

// @ts-ignore
window.Worker = function () {
  this.postMessage = () => {};
  // @ts-ignore
  this.terminate = () => {};
};

// @ts-ignore
window.URL = {
  createObjectURL: () => {
    return "";
  }
};

// https://github.com/elastic/eui/issues/2530
jest.mock("@elastic/eui/lib/eui_components/icon", () => ({
  EuiIcon: () => "EuiIconMock",
  __esModule: true,
  IconPropType: require("@elastic/eui/lib/eui_components/icon/icon").IconPropType,
  ICON_TYPES: require("@elastic/eui/lib/eui_components/icon/icon").TYPES,
  ICON_SIZES: require("@elastic/eui/lib/eui_components/icon/icon").SIZES,
  ICON_COLORS: require("@elastic/eui/lib/eui_components/icon/icon").COLORS
}));
jest.setTimeout(60000); // in milliseconds
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiX3JlYWN0IiwiY29uZmlndXJlIiwidGVzdElkQXR0cmlidXRlIiwiYXN5bmNVdGlsVGltZW91dCIsImplc3QiLCJtb2NrIiwiaHRtbElkR2VuZXJhdG9yIiwid2luZG93IiwiV29ya2VyIiwicG9zdE1lc3NhZ2UiLCJ0ZXJtaW5hdGUiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJFdWlJY29uIiwiX19lc01vZHVsZSIsIkljb25Qcm9wVHlwZSIsIklDT05fVFlQRVMiLCJUWVBFUyIsIklDT05fU0laRVMiLCJTSVpFUyIsIklDT05fQ09MT1JTIiwiQ09MT1JTIiwic2V0VGltZW91dCJdLCJzb3VyY2VzIjpbInNldHVwLmplc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgXCJAdGVzdGluZy1saWJyYXJ5L2plc3QtZG9tL2V4dGVuZC1leHBlY3RcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZSB9IGZyb20gXCJAdGVzdGluZy1saWJyYXJ5L3JlYWN0XCI7XG5cbmNvbmZpZ3VyZSh7XG4gIHRlc3RJZEF0dHJpYnV0ZTogXCJkYXRhLXRlc3Qtc3VialwiLFxuICBhc3luY1V0aWxUaW1lb3V0OiAxMDAwMCxcbn0pO1xuXG5qZXN0Lm1vY2soXCJAZWxhc3RpYy9ldWkvbGliL2V1aV9jb21wb25lbnRzL2Zvcm0vZm9ybV9yb3cvbWFrZV9pZFwiLCAoKSA9PiAoKSA9PiBcInNvbWVfbWFrZV9pZFwiKTtcblxuamVzdC5tb2NrKFwiQGVsYXN0aWMvZXVpL2xpYi9zZXJ2aWNlcy9hY2Nlc3NpYmlsaXR5L2h0bWxfaWRfZ2VuZXJhdG9yXCIsICgpID0+ICh7XG4gIGh0bWxJZEdlbmVyYXRvcjogKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiBcInNvbWVfaHRtbF9pZFwiO1xuICB9LFxufSkpO1xuXG4vLyBAdHMtaWdub3JlXG53aW5kb3cuV29ya2VyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBvc3RNZXNzYWdlID0gKCkgPT4ge307XG4gIC8vIEB0cy1pZ25vcmVcbiAgdGhpcy50ZXJtaW5hdGUgPSAoKSA9PiB7fTtcbn07XG5cbi8vIEB0cy1pZ25vcmVcbndpbmRvdy5VUkwgPSB7XG4gIGNyZWF0ZU9iamVjdFVSTDogKCkgPT4ge1xuICAgIHJldHVybiBcIlwiO1xuICB9LFxufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2VsYXN0aWMvZXVpL2lzc3Vlcy8yNTMwXG5qZXN0Lm1vY2soXCJAZWxhc3RpYy9ldWkvbGliL2V1aV9jb21wb25lbnRzL2ljb25cIiwgKCkgPT4gKHtcbiAgRXVpSWNvbjogKCkgPT4gXCJFdWlJY29uTW9ja1wiLFxuICBfX2VzTW9kdWxlOiB0cnVlLFxuICBJY29uUHJvcFR5cGU6IHJlcXVpcmUoXCJAZWxhc3RpYy9ldWkvbGliL2V1aV9jb21wb25lbnRzL2ljb24vaWNvblwiKS5JY29uUHJvcFR5cGUsXG4gIElDT05fVFlQRVM6IHJlcXVpcmUoXCJAZWxhc3RpYy9ldWkvbGliL2V1aV9jb21wb25lbnRzL2ljb24vaWNvblwiKS5UWVBFUyxcbiAgSUNPTl9TSVpFUzogcmVxdWlyZShcIkBlbGFzdGljL2V1aS9saWIvZXVpX2NvbXBvbmVudHMvaWNvbi9pY29uXCIpLlNJWkVTLFxuICBJQ09OX0NPTE9SUzogcmVxdWlyZShcIkBlbGFzdGljL2V1aS9saWIvZXVpX2NvbXBvbmVudHMvaWNvbi9pY29uXCIpLkNPTE9SUyxcbn0pKTtcblxuamVzdC5zZXRUaW1lb3V0KDYwMDAwKTsgLy8gaW4gbWlsbGlzZWNvbmRzXG4iXSwibWFwcGluZ3MiOiI7O0FBS0FBLE9BQUE7QUFDQSxJQUFBQyxNQUFBLEdBQUFELE9BQUE7QUFOQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxJQUFBRSxnQkFBUyxFQUFDO0VBQ1JDLGVBQWUsRUFBRSxnQkFBZ0I7RUFDakNDLGdCQUFnQixFQUFFO0FBQ3BCLENBQUMsQ0FBQztBQUVGQyxJQUFJLENBQUNDLElBQUksQ0FBQyx1REFBdUQsRUFBRSxNQUFNLE1BQU0sY0FBYyxDQUFDO0FBRTlGRCxJQUFJLENBQUNDLElBQUksQ0FBQywyREFBMkQsRUFBRSxPQUFPO0VBQzVFQyxlQUFlLEVBQUVBLENBQUEsS0FBTTtJQUNyQixPQUFPLE1BQU0sY0FBYztFQUM3QjtBQUNGLENBQUMsQ0FBQyxDQUFDOztBQUVIO0FBQ0FDLE1BQU0sQ0FBQ0MsTUFBTSxHQUFHLFlBQVk7RUFDMUIsSUFBSSxDQUFDQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUM7RUFDM0I7RUFDQSxJQUFJLENBQUNDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUMzQixDQUFDOztBQUVEO0FBQ0FILE1BQU0sQ0FBQ0ksR0FBRyxHQUFHO0VBQ1hDLGVBQWUsRUFBRUEsQ0FBQSxLQUFNO0lBQ3JCLE9BQU8sRUFBRTtFQUNYO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBUixJQUFJLENBQUNDLElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxPQUFPO0VBQ3ZEUSxPQUFPLEVBQUVBLENBQUEsS0FBTSxhQUFhO0VBQzVCQyxVQUFVLEVBQUUsSUFBSTtFQUNoQkMsWUFBWSxFQUFFaEIsT0FBTyxDQUFDLDJDQUEyQyxDQUFDLENBQUNnQixZQUFZO0VBQy9FQyxVQUFVLEVBQUVqQixPQUFPLENBQUMsMkNBQTJDLENBQUMsQ0FBQ2tCLEtBQUs7RUFDdEVDLFVBQVUsRUFBRW5CLE9BQU8sQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDb0IsS0FBSztFQUN0RUMsV0FBVyxFQUFFckIsT0FBTyxDQUFDLDJDQUEyQyxDQUFDLENBQUNzQjtBQUNwRSxDQUFDLENBQUMsQ0FBQztBQUVIakIsSUFBSSxDQUFDa0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMifQ==