"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSearchDashboardsSecurityFactory = void 0;
var _md = _interopRequireDefault(require("md5"));
var _constants = require("../../../../common/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class OpenSearchDashboardsSecurityFactory {
  constructor() {
    _defineProperty(this, "platform", _constants.WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY);
  }
  async getCurrentUser(request, context) {
    try {
      const params = {
        path: `/_opendistro/_security/api/account`,
        method: 'GET'
      };
      const {
        body: authContext
      } = await context.core.opensearch.client.asCurrentUser.transport.request(params);
      const username = this.getUserName(authContext);
      return {
        username,
        authContext,
        hashUsername: (0, _md.default)(username)
      };
    } catch (error) {
      throw error;
    }
  }
  getUserName(authContext) {
    return authContext['user_name'];
  }
  async isAdministratorUser(context, request) {
    // This is replaced after creating the instance
  }
}
exports.OpenSearchDashboardsSecurityFactory = OpenSearchDashboardsSecurityFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9jb25zdGFudHMiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJPcGVuU2VhcmNoRGFzaGJvYXJkc1NlY3VyaXR5RmFjdG9yeSIsImNvbnN0cnVjdG9yIiwiV0FaVUhfU0VDVVJJVFlfUExVR0lOX09QRU5TRUFSQ0hfREFTSEJPQVJEU19TRUNVUklUWSIsImdldEN1cnJlbnRVc2VyIiwicmVxdWVzdCIsImNvbnRleHQiLCJwYXJhbXMiLCJwYXRoIiwibWV0aG9kIiwiYm9keSIsImF1dGhDb250ZXh0IiwiY29yZSIsIm9wZW5zZWFyY2giLCJjbGllbnQiLCJhc0N1cnJlbnRVc2VyIiwidHJhbnNwb3J0IiwidXNlcm5hbWUiLCJnZXRVc2VyTmFtZSIsImhhc2hVc2VybmFtZSIsIm1kNSIsImVycm9yIiwiaXNBZG1pbmlzdHJhdG9yVXNlciIsImV4cG9ydHMiXSwic291cmNlcyI6WyJvcGVuc2VhcmNoLWRhc2hib2FyZHMtc2VjdXJpdHktZmFjdG9yeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VjdXJpdHlGYWN0b3J5IH0gZnJvbSAnLi4nO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG59IGZyb20gJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInO1xuaW1wb3J0IG1kNSBmcm9tICdtZDUnO1xuaW1wb3J0IHsgV0FaVUhfU0VDVVJJVFlfUExVR0lOX09QRU5TRUFSQ0hfREFTSEJPQVJEU19TRUNVUklUWSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgT3BlblNlYXJjaERhc2hib2FyZHNTZWN1cml0eUZhY3RvcnkgaW1wbGVtZW50cyBJU2VjdXJpdHlGYWN0b3J5IHtcbiAgcGxhdGZvcm06IHN0cmluZyA9IFdBWlVIX1NFQ1VSSVRZX1BMVUdJTl9PUEVOU0VBUkNIX0RBU0hCT0FSRFNfU0VDVVJJVFk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBhc3luYyBnZXRDdXJyZW50VXNlcihcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBwYXRoOiBgL19vcGVuZGlzdHJvL19zZWN1cml0eS9hcGkvYWNjb3VudGAsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGJvZHk6IGF1dGhDb250ZXh0IH0gPVxuICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci50cmFuc3BvcnQucmVxdWVzdChcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICk7XG4gICAgICBjb25zdCB1c2VybmFtZSA9IHRoaXMuZ2V0VXNlck5hbWUoYXV0aENvbnRleHQpO1xuICAgICAgcmV0dXJuIHsgdXNlcm5hbWUsIGF1dGhDb250ZXh0LCBoYXNoVXNlcm5hbWU6IG1kNSh1c2VybmFtZSkgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgZ2V0VXNlck5hbWUoYXV0aENvbnRleHQ6IGFueSkge1xuICAgIHJldHVybiBhdXRoQ29udGV4dFsndXNlcl9uYW1lJ107XG4gIH1cblxuICBhc3luYyBpc0FkbWluaXN0cmF0b3JVc2VyKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICkge1xuICAgIC8vIFRoaXMgaXMgcmVwbGFjZWQgYWZ0ZXIgY3JlYXRpbmcgdGhlIGluc3RhbmNlXG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0EsSUFBQUEsR0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsVUFBQSxHQUFBRCxPQUFBO0FBQW9HLFNBQUFELHVCQUFBRyxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBQUEsU0FBQUcsZ0JBQUFILEdBQUEsRUFBQUksR0FBQSxFQUFBQyxLQUFBLElBQUFELEdBQUEsR0FBQUUsY0FBQSxDQUFBRixHQUFBLE9BQUFBLEdBQUEsSUFBQUosR0FBQSxJQUFBTyxNQUFBLENBQUFDLGNBQUEsQ0FBQVIsR0FBQSxFQUFBSSxHQUFBLElBQUFDLEtBQUEsRUFBQUEsS0FBQSxFQUFBSSxVQUFBLFFBQUFDLFlBQUEsUUFBQUMsUUFBQSxvQkFBQVgsR0FBQSxDQUFBSSxHQUFBLElBQUFDLEtBQUEsV0FBQUwsR0FBQTtBQUFBLFNBQUFNLGVBQUFNLEdBQUEsUUFBQVIsR0FBQSxHQUFBUyxZQUFBLENBQUFELEdBQUEsMkJBQUFSLEdBQUEsZ0JBQUFBLEdBQUEsR0FBQVUsTUFBQSxDQUFBVixHQUFBO0FBQUEsU0FBQVMsYUFBQUUsS0FBQSxFQUFBQyxJQUFBLGVBQUFELEtBQUEsaUJBQUFBLEtBQUEsa0JBQUFBLEtBQUEsTUFBQUUsSUFBQSxHQUFBRixLQUFBLENBQUFHLE1BQUEsQ0FBQUMsV0FBQSxPQUFBRixJQUFBLEtBQUFHLFNBQUEsUUFBQUMsR0FBQSxHQUFBSixJQUFBLENBQUFLLElBQUEsQ0FBQVAsS0FBQSxFQUFBQyxJQUFBLDJCQUFBSyxHQUFBLHNCQUFBQSxHQUFBLFlBQUFFLFNBQUEsNERBQUFQLElBQUEsZ0JBQUFGLE1BQUEsR0FBQVUsTUFBQSxFQUFBVCxLQUFBO0FBRTdGLE1BQU1VLG1DQUFtQyxDQUE2QjtFQUUzRUMsV0FBV0EsQ0FBQSxFQUFHO0lBQUF2QixlQUFBLG1CQURLd0IsK0RBQW9EO0VBQ3hEO0VBRWYsTUFBTUMsY0FBY0EsQ0FDbEJDLE9BQW9DLEVBQ3BDQyxPQUE4QixFQUM5QjtJQUNBLElBQUk7TUFDRixNQUFNQyxNQUFNLEdBQUc7UUFDYkMsSUFBSSxFQUFHLG9DQUFtQztRQUMxQ0MsTUFBTSxFQUFFO01BQ1YsQ0FBQztNQUVELE1BQU07UUFBRUMsSUFBSSxFQUFFQztNQUFZLENBQUMsR0FDekIsTUFBTUwsT0FBTyxDQUFDTSxJQUFJLENBQUNDLFVBQVUsQ0FBQ0MsTUFBTSxDQUFDQyxhQUFhLENBQUNDLFNBQVMsQ0FBQ1gsT0FBTyxDQUNsRUUsTUFDRixDQUFDO01BQ0gsTUFBTVUsUUFBUSxHQUFHLElBQUksQ0FBQ0MsV0FBVyxDQUFDUCxXQUFXLENBQUM7TUFDOUMsT0FBTztRQUFFTSxRQUFRO1FBQUVOLFdBQVc7UUFBRVEsWUFBWSxFQUFFLElBQUFDLFdBQUcsRUFBQ0gsUUFBUTtNQUFFLENBQUM7SUFDL0QsQ0FBQyxDQUFDLE9BQU9JLEtBQUssRUFBRTtNQUNkLE1BQU1BLEtBQUs7SUFDYjtFQUNGO0VBRUFILFdBQVdBLENBQUNQLFdBQWdCLEVBQUU7SUFDNUIsT0FBT0EsV0FBVyxDQUFDLFdBQVcsQ0FBQztFQUNqQztFQUVBLE1BQU1XLG1CQUFtQkEsQ0FDdkJoQixPQUE4QixFQUM5QkQsT0FBb0MsRUFDcEM7SUFDQTtFQUFBO0FBRUo7QUFBQ2tCLE9BQUEsQ0FBQXRCLG1DQUFBLEdBQUFBLG1DQUFBIn0=