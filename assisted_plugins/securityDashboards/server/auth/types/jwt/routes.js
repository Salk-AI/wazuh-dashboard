"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtAuthRoutes = void 0;
var _common = require("../../../../common");
var _cookie_splitter = require("../../../session/cookie_splitter");
var _jwt_auth = require("./jwt_auth");
/*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

class JwtAuthRoutes {
  constructor(router, sessionStorageFactory, config) {
    this.router = router;
    this.sessionStorageFactory = sessionStorageFactory;
    this.config = config;
  }
  getExtraAuthStorageOptions(logger) {
    var _this$config$jwt, _this$config$jwt2;
    const extraAuthStorageOptions = {
      cookiePrefix: ((_this$config$jwt = this.config.jwt) === null || _this$config$jwt === void 0 ? void 0 : _this$config$jwt.extra_storage.cookie_prefix) || _jwt_auth.JWT_DEFAULT_EXTRA_STORAGE_OPTIONS.cookiePrefix,
      additionalCookies: ((_this$config$jwt2 = this.config.jwt) === null || _this$config$jwt2 === void 0 ? void 0 : _this$config$jwt2.extra_storage.additional_cookies) || _jwt_auth.JWT_DEFAULT_EXTRA_STORAGE_OPTIONS.additionalCookies,
      logger
    };
    return extraAuthStorageOptions;
  }
  setupRoutes() {
    this.router.post({
      path: `${_common.API_PREFIX}${_common.API_AUTH_LOGOUT}`,
      validate: false,
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      await (0, _cookie_splitter.clearSplitCookies)(request, this.getExtraAuthStorageOptions());
      this.sessionStorageFactory.asScoped(request).clear();
      return response.ok();
    });
  }
}
exports.JwtAuthRoutes = JwtAuthRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29tbW9uIiwicmVxdWlyZSIsIl9jb29raWVfc3BsaXR0ZXIiLCJfand0X2F1dGgiLCJKd3RBdXRoUm91dGVzIiwiY29uc3RydWN0b3IiLCJyb3V0ZXIiLCJzZXNzaW9uU3RvcmFnZUZhY3RvcnkiLCJjb25maWciLCJnZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyIsImxvZ2dlciIsIl90aGlzJGNvbmZpZyRqd3QiLCJfdGhpcyRjb25maWckand0MiIsImV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zIiwiY29va2llUHJlZml4Iiwiand0IiwiZXh0cmFfc3RvcmFnZSIsImNvb2tpZV9wcmVmaXgiLCJKV1RfREVGQVVMVF9FWFRSQV9TVE9SQUdFX09QVElPTlMiLCJhZGRpdGlvbmFsQ29va2llcyIsImFkZGl0aW9uYWxfY29va2llcyIsInNldHVwUm91dGVzIiwicG9zdCIsInBhdGgiLCJBUElfUFJFRklYIiwiQVBJX0FVVEhfTE9HT1VUIiwidmFsaWRhdGUiLCJvcHRpb25zIiwiYXV0aFJlcXVpcmVkIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImNsZWFyU3BsaXRDb29raWVzIiwiYXNTY29wZWQiLCJjbGVhciIsIm9rIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbInJvdXRlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IElSb3V0ZXIsIExvZ2dlciwgU2Vzc2lvblN0b3JhZ2VGYWN0b3J5IH0gZnJvbSAnb3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlcic7XG5pbXBvcnQgeyBTZWN1cml0eVNlc3Npb25Db29raWUgfSBmcm9tICcuLi8uLi8uLi9zZXNzaW9uL3NlY3VyaXR5X2Nvb2tpZSc7XG5pbXBvcnQgeyBBUElfQVVUSF9MT0dPVVQsIEFQSV9QUkVGSVggfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24nO1xuaW1wb3J0IHsgY2xlYXJTcGxpdENvb2tpZXMsIEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9jb29raWVfc3BsaXR0ZXInO1xuaW1wb3J0IHsgSldUX0RFRkFVTFRfRVhUUkFfU1RPUkFHRV9PUFRJT05TIH0gZnJvbSAnLi9qd3RfYXV0aCc7XG5pbXBvcnQgeyBTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGUgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBKd3RBdXRoUm91dGVzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IElSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXNzaW9uU3RvcmFnZUZhY3Rvcnk6IFNlc3Npb25TdG9yYWdlRmFjdG9yeTxTZWN1cml0eVNlc3Npb25Db29raWU+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnOiBTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGVcbiAgKSB7fVxuXG4gIHByaXZhdGUgZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMobG9nZ2VyPzogTG9nZ2VyKTogRXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMge1xuICAgIGNvbnN0IGV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zOiBFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyA9IHtcbiAgICAgIGNvb2tpZVByZWZpeDpcbiAgICAgICAgdGhpcy5jb25maWcuand0Py5leHRyYV9zdG9yYWdlLmNvb2tpZV9wcmVmaXggfHxcbiAgICAgICAgSldUX0RFRkFVTFRfRVhUUkFfU1RPUkFHRV9PUFRJT05TLmNvb2tpZVByZWZpeCxcbiAgICAgIGFkZGl0aW9uYWxDb29raWVzOlxuICAgICAgICB0aGlzLmNvbmZpZy5qd3Q/LmV4dHJhX3N0b3JhZ2UuYWRkaXRpb25hbF9jb29raWVzIHx8XG4gICAgICAgIEpXVF9ERUZBVUxUX0VYVFJBX1NUT1JBR0VfT1BUSU9OUy5hZGRpdGlvbmFsQ29va2llcyxcbiAgICAgIGxvZ2dlcixcbiAgICB9O1xuXG4gICAgcmV0dXJuIGV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zO1xuICB9XG5cbiAgcHVibGljIHNldHVwUm91dGVzKCkge1xuICAgIHRoaXMucm91dGVyLnBvc3QoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9JHtBUElfQVVUSF9MT0dPVVR9YCxcbiAgICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgYXdhaXQgY2xlYXJTcGxpdENvb2tpZXMocmVxdWVzdCwgdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucygpKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFpQkEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsZ0JBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLFNBQUEsR0FBQUYsT0FBQTtBQW5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVNPLE1BQU1HLGFBQWEsQ0FBQztFQUN6QkMsV0FBV0EsQ0FDUUMsTUFBZSxFQUNmQyxxQkFBbUUsRUFDbkVDLE1BQWdDLEVBQ2pEO0lBQUEsS0FIaUJGLE1BQWUsR0FBZkEsTUFBZTtJQUFBLEtBQ2ZDLHFCQUFtRSxHQUFuRUEscUJBQW1FO0lBQUEsS0FDbkVDLE1BQWdDLEdBQWhDQSxNQUFnQztFQUNoRDtFQUVLQywwQkFBMEJBLENBQUNDLE1BQWUsRUFBMkI7SUFBQSxJQUFBQyxnQkFBQSxFQUFBQyxpQkFBQTtJQUMzRSxNQUFNQyx1QkFBZ0QsR0FBRztNQUN2REMsWUFBWSxFQUNWLEVBQUFILGdCQUFBLE9BQUksQ0FBQ0gsTUFBTSxDQUFDTyxHQUFHLGNBQUFKLGdCQUFBLHVCQUFmQSxnQkFBQSxDQUFpQkssYUFBYSxDQUFDQyxhQUFhLEtBQzVDQywyQ0FBaUMsQ0FBQ0osWUFBWTtNQUNoREssaUJBQWlCLEVBQ2YsRUFBQVAsaUJBQUEsT0FBSSxDQUFDSixNQUFNLENBQUNPLEdBQUcsY0FBQUgsaUJBQUEsdUJBQWZBLGlCQUFBLENBQWlCSSxhQUFhLENBQUNJLGtCQUFrQixLQUNqREYsMkNBQWlDLENBQUNDLGlCQUFpQjtNQUNyRFQ7SUFDRixDQUFDO0lBRUQsT0FBT0csdUJBQXVCO0VBQ2hDO0VBRU9RLFdBQVdBLENBQUEsRUFBRztJQUNuQixJQUFJLENBQUNmLE1BQU0sQ0FBQ2dCLElBQUksQ0FDZDtNQUNFQyxJQUFJLEVBQUcsR0FBRUMsa0JBQVcsR0FBRUMsdUJBQWdCLEVBQUM7TUFDdkNDLFFBQVEsRUFBRSxLQUFLO01BQ2ZDLE9BQU8sRUFBRTtRQUNQQyxZQUFZLEVBQUU7TUFDaEI7SUFDRixDQUFDLEVBQ0QsT0FBT0MsT0FBTyxFQUFFQyxPQUFPLEVBQUVDLFFBQVEsS0FBSztNQUNwQyxNQUFNLElBQUFDLGtDQUFpQixFQUFDRixPQUFPLEVBQUUsSUFBSSxDQUFDckIsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO01BQ25FLElBQUksQ0FBQ0YscUJBQXFCLENBQUMwQixRQUFRLENBQUNILE9BQU8sQ0FBQyxDQUFDSSxLQUFLLENBQUMsQ0FBQztNQUNwRCxPQUFPSCxRQUFRLENBQUNJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQ0YsQ0FBQztFQUNIO0FBQ0Y7QUFBQ0MsT0FBQSxDQUFBaEMsYUFBQSxHQUFBQSxhQUFBIn0=