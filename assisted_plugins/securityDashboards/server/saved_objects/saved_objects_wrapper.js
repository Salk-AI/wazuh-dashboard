"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecuritySavedObjectsClientWrapper = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _common = require("../../common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
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
class SecuritySavedObjectsClientWrapper {
  constructor() {
    _defineProperty(this, "httpStart", void 0);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "wrapperFactory", wrapperOptions => {
      var _state$authInfo;
      const state = this.httpStart.auth.get(wrapperOptions.request).state || {};
      const selectedTenant = state.selectedTenant;
      const username = (_state$authInfo = state.authInfo) === null || _state$authInfo === void 0 ? void 0 : _state$authInfo.user_name;
      const isGlobalEnabled = this.config.multitenancy.tenants.enable_global;
      const isPrivateEnabled = this.config.multitenancy.tenants.enable_private;
      let namespaceValue = selectedTenant;
      const createWithNamespace = async (type, attributes, options) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.create(type, attributes, options);
      };
      const bulkGetWithNamespace = async (objects = [], options = {}) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.bulkGet(objects, options);
      };
      const findWithNamespace = async options => {
        var _state$authInfo2;
        const tenants = (_state$authInfo2 = state.authInfo) === null || _state$authInfo2 === void 0 ? void 0 : _state$authInfo2.tenants;
        const availableTenantNames = Object.keys(tenants);
        availableTenantNames.push(_common.DEFAULT_TENANT); // The value of namespace is "default" if saved objects are created when opensearch_security.multitenancy.enable_aggregation_view is set to false. So adding it to find.
        if (isGlobalEnabled) {
          availableTenantNames.push(_common.GLOBAL_TENANT_SYMBOL);
        }
        if (isPrivateEnabled) {
          availableTenantNames.push(_common.PRIVATE_TENANT_SYMBOL + username);
        }
        if (availableTenantNames.includes(_common.globalTenantName)) {
          let index = availableTenantNames.indexOf(_common.globalTenantName);
          if (index > -1) {
            availableTenantNames.splice(index, 1);
          }
          index = availableTenantNames.indexOf(username);
          if (index > -1) {
            availableTenantNames.splice(index, 1);
          }
        }
        if ((0, _common.isPrivateTenant)(selectedTenant)) {
          namespaceValue = selectedTenant + username;
        }
        if (!!options.namespaces) {
          const namespacesToInclude = Array.isArray(options.namespaces) ? options.namespaces : [options.namespaces];
          const typeToNamespacesMap = {};
          const searchTypes = Array.isArray(options.type) ? options.type : [options.type];
          searchTypes.forEach(t => {
            typeToNamespacesMap[t] = namespacesToInclude;
          });
          if (searchTypes.includes('config')) {
            if (namespacesToInclude.includes(namespaceValue)) {
              typeToNamespacesMap.config = [namespaceValue];
            } else {
              delete typeToNamespacesMap.config;
            }
          }
          options.typeToNamespacesMap = new Map(Object.entries(typeToNamespacesMap));
          options.type = '';
          options.namespaces = [];
        } else {
          options.namespaces = [namespaceValue];
        }
        return await wrapperOptions.client.find(options);
      };
      const getWithNamespace = async (type, id, options = {}) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.get(type, id, options);
      };
      const updateWithNamespace = async (type, id, attributes, options = {}) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.update(type, id, attributes, options);
      };
      const bulkCreateWithNamespace = async (objects, options) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.bulkCreate(objects, options);
      };
      const bulkUpdateWithNamespace = async (objects, options) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.bulkUpdate(objects, options);
      };
      const deleteWithNamespace = async (type, id, options = {}) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.delete(type, id, options);
      };
      const checkConflictsWithNamespace = async (objects = [], options = {}) => {
        namespaceValue = this.getNamespaceValue(selectedTenant, isPrivateEnabled, username);
        _lodash.default.assign(options, {
          namespace: [namespaceValue]
        });
        return await wrapperOptions.client.checkConflicts(objects, options);
      };
      return {
        ...wrapperOptions.client,
        get: getWithNamespace,
        update: updateWithNamespace,
        bulkCreate: bulkCreateWithNamespace,
        bulkGet: bulkGetWithNamespace,
        bulkUpdate: bulkUpdateWithNamespace,
        create: createWithNamespace,
        delete: deleteWithNamespace,
        errors: wrapperOptions.client.errors,
        checkConflicts: checkConflictsWithNamespace,
        addToNamespaces: wrapperOptions.client.addToNamespaces,
        find: findWithNamespace,
        deleteFromNamespaces: wrapperOptions.client.deleteFromNamespaces
      };
    });
  }
  isAPrivateTenant(selectedTenant, isPrivateEnabled) {
    return selectedTenant !== undefined && isPrivateEnabled && (0, _common.isPrivateTenant)(selectedTenant);
  }
  getNamespaceValue(selectedTenant, isPrivateEnabled, username) {
    let namespaceValue = selectedTenant;
    if (this.isAPrivateTenant(selectedTenant, isPrivateEnabled)) {
      namespaceValue = selectedTenant + username;
    }
    return namespaceValue;
  }
}
exports.SecuritySavedObjectsClientWrapper = SecuritySavedObjectsClientWrapper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfY29tbW9uIiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJfZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJ2YWx1ZSIsIl90b1Byb3BlcnR5S2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhcmciLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJpbnB1dCIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ1bmRlZmluZWQiLCJyZXMiLCJjYWxsIiwiVHlwZUVycm9yIiwiTnVtYmVyIiwiU2VjdXJpdHlTYXZlZE9iamVjdHNDbGllbnRXcmFwcGVyIiwiY29uc3RydWN0b3IiLCJ3cmFwcGVyT3B0aW9ucyIsIl9zdGF0ZSRhdXRoSW5mbyIsInN0YXRlIiwiaHR0cFN0YXJ0IiwiYXV0aCIsImdldCIsInJlcXVlc3QiLCJzZWxlY3RlZFRlbmFudCIsInVzZXJuYW1lIiwiYXV0aEluZm8iLCJ1c2VyX25hbWUiLCJpc0dsb2JhbEVuYWJsZWQiLCJjb25maWciLCJtdWx0aXRlbmFuY3kiLCJ0ZW5hbnRzIiwiZW5hYmxlX2dsb2JhbCIsImlzUHJpdmF0ZUVuYWJsZWQiLCJlbmFibGVfcHJpdmF0ZSIsIm5hbWVzcGFjZVZhbHVlIiwiY3JlYXRlV2l0aE5hbWVzcGFjZSIsInR5cGUiLCJhdHRyaWJ1dGVzIiwib3B0aW9ucyIsImdldE5hbWVzcGFjZVZhbHVlIiwiXyIsImFzc2lnbiIsIm5hbWVzcGFjZSIsImNsaWVudCIsImNyZWF0ZSIsImJ1bGtHZXRXaXRoTmFtZXNwYWNlIiwib2JqZWN0cyIsImJ1bGtHZXQiLCJmaW5kV2l0aE5hbWVzcGFjZSIsIl9zdGF0ZSRhdXRoSW5mbzIiLCJhdmFpbGFibGVUZW5hbnROYW1lcyIsImtleXMiLCJwdXNoIiwiREVGQVVMVF9URU5BTlQiLCJHTE9CQUxfVEVOQU5UX1NZTUJPTCIsIlBSSVZBVEVfVEVOQU5UX1NZTUJPTCIsImluY2x1ZGVzIiwiZ2xvYmFsVGVuYW50TmFtZSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImlzUHJpdmF0ZVRlbmFudCIsIm5hbWVzcGFjZXMiLCJuYW1lc3BhY2VzVG9JbmNsdWRlIiwiQXJyYXkiLCJpc0FycmF5IiwidHlwZVRvTmFtZXNwYWNlc01hcCIsInNlYXJjaFR5cGVzIiwiZm9yRWFjaCIsInQiLCJNYXAiLCJlbnRyaWVzIiwiZmluZCIsImdldFdpdGhOYW1lc3BhY2UiLCJpZCIsInVwZGF0ZVdpdGhOYW1lc3BhY2UiLCJ1cGRhdGUiLCJidWxrQ3JlYXRlV2l0aE5hbWVzcGFjZSIsImJ1bGtDcmVhdGUiLCJidWxrVXBkYXRlV2l0aE5hbWVzcGFjZSIsImJ1bGtVcGRhdGUiLCJkZWxldGVXaXRoTmFtZXNwYWNlIiwiZGVsZXRlIiwiY2hlY2tDb25mbGljdHNXaXRoTmFtZXNwYWNlIiwiY2hlY2tDb25mbGljdHMiLCJlcnJvcnMiLCJhZGRUb05hbWVzcGFjZXMiLCJkZWxldGVGcm9tTmFtZXNwYWNlcyIsImlzQVByaXZhdGVUZW5hbnQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsic2F2ZWRfb2JqZWN0c193cmFwcGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gIEh0dHBTZXJ2aWNlU3RhcnQsXG4gIFNhdmVkT2JqZWN0LFxuICBTYXZlZE9iamVjdHNCYXNlT3B0aW9ucyxcbiAgU2F2ZWRPYmplY3RzQnVsa0NyZWF0ZU9iamVjdCxcbiAgU2F2ZWRPYmplY3RzQnVsa0dldE9iamVjdCxcbiAgU2F2ZWRPYmplY3RzQnVsa1Jlc3BvbnNlLFxuICBTYXZlZE9iamVjdHNCdWxrVXBkYXRlT2JqZWN0LFxuICBTYXZlZE9iamVjdHNCdWxrVXBkYXRlT3B0aW9ucyxcbiAgU2F2ZWRPYmplY3RzQnVsa1VwZGF0ZVJlc3BvbnNlLFxuICBTYXZlZE9iamVjdHNDaGVja0NvbmZsaWN0c09iamVjdCxcbiAgU2F2ZWRPYmplY3RzQ2hlY2tDb25mbGljdHNSZXNwb25zZSxcbiAgU2F2ZWRPYmplY3RzQ2xpZW50V3JhcHBlckZhY3RvcnksXG4gIFNhdmVkT2JqZWN0c0NyZWF0ZU9wdGlvbnMsXG4gIFNhdmVkT2JqZWN0c0RlbGV0ZU9wdGlvbnMsXG4gIFNhdmVkT2JqZWN0c0ZpbmRPcHRpb25zLFxuICBTYXZlZE9iamVjdHNGaW5kUmVzcG9uc2UsXG4gIFNhdmVkT2JqZWN0c1VwZGF0ZU9wdGlvbnMsXG4gIFNhdmVkT2JqZWN0c1VwZGF0ZVJlc3BvbnNlLFxufSBmcm9tICdvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IE9wZW5TZWFyY2hEYXNoYm9hcmRzQXV0aFN0YXRlIH0gZnJvbSAnLi4vYXV0aC90eXBlcy9hdXRoZW50aWNhdGlvbl90eXBlJztcbmltcG9ydCB7XG4gIERFRkFVTFRfVEVOQU5ULFxuICBHTE9CQUxfVEVOQU5UX1NZTUJPTCxcbiAgZ2xvYmFsVGVuYW50TmFtZSxcbiAgaXNQcml2YXRlVGVuYW50LFxuICBQUklWQVRFX1RFTkFOVF9TWU1CT0wsXG59IGZyb20gJy4uLy4uL2NvbW1vbic7XG5cbmV4cG9ydCBjbGFzcyBTZWN1cml0eVNhdmVkT2JqZWN0c0NsaWVudFdyYXBwZXIge1xuICBwdWJsaWMgaHR0cFN0YXJ0PzogSHR0cFNlcnZpY2VTdGFydDtcbiAgcHVibGljIGNvbmZpZz86IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHVibGljIHdyYXBwZXJGYWN0b3J5OiBTYXZlZE9iamVjdHNDbGllbnRXcmFwcGVyRmFjdG9yeSA9ICh3cmFwcGVyT3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHN0YXRlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc0F1dGhTdGF0ZSA9XG4gICAgICAodGhpcy5odHRwU3RhcnQhLmF1dGguZ2V0KHdyYXBwZXJPcHRpb25zLnJlcXVlc3QpLnN0YXRlIGFzIE9wZW5TZWFyY2hEYXNoYm9hcmRzQXV0aFN0YXRlKSB8fFxuICAgICAge307XG5cbiAgICBjb25zdCBzZWxlY3RlZFRlbmFudCA9IHN0YXRlLnNlbGVjdGVkVGVuYW50O1xuICAgIGNvbnN0IHVzZXJuYW1lID0gc3RhdGUuYXV0aEluZm8/LnVzZXJfbmFtZTtcbiAgICBjb25zdCBpc0dsb2JhbEVuYWJsZWQgPSB0aGlzLmNvbmZpZyEubXVsdGl0ZW5hbmN5LnRlbmFudHMuZW5hYmxlX2dsb2JhbDtcbiAgICBjb25zdCBpc1ByaXZhdGVFbmFibGVkID0gdGhpcy5jb25maWchLm11bHRpdGVuYW5jeS50ZW5hbnRzLmVuYWJsZV9wcml2YXRlO1xuXG4gICAgbGV0IG5hbWVzcGFjZVZhbHVlID0gc2VsZWN0ZWRUZW5hbnQ7XG5cbiAgICBjb25zdCBjcmVhdGVXaXRoTmFtZXNwYWNlID0gYXN5bmMgPFQgPSB1bmtub3duPihcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIGF0dHJpYnV0ZXM6IFQsXG4gICAgICBvcHRpb25zPzogU2F2ZWRPYmplY3RzQ3JlYXRlT3B0aW9uc1xuICAgICkgPT4ge1xuICAgICAgbmFtZXNwYWNlVmFsdWUgPSB0aGlzLmdldE5hbWVzcGFjZVZhbHVlKHNlbGVjdGVkVGVuYW50LCBpc1ByaXZhdGVFbmFibGVkLCB1c2VybmFtZSk7XG4gICAgICBfLmFzc2lnbihvcHRpb25zLCB7IG5hbWVzcGFjZTogW25hbWVzcGFjZVZhbHVlXSB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB3cmFwcGVyT3B0aW9ucy5jbGllbnQuY3JlYXRlKHR5cGUsIGF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBjb25zdCBidWxrR2V0V2l0aE5hbWVzcGFjZSA9IGFzeW5jIDxUID0gdW5rbm93bj4oXG4gICAgICBvYmplY3RzOiBTYXZlZE9iamVjdHNCdWxrR2V0T2JqZWN0W10gPSBbXSxcbiAgICAgIG9wdGlvbnM6IFNhdmVkT2JqZWN0c0Jhc2VPcHRpb25zID0ge31cbiAgICApOiBQcm9taXNlPFNhdmVkT2JqZWN0c0J1bGtSZXNwb25zZTxUPj4gPT4ge1xuICAgICAgbmFtZXNwYWNlVmFsdWUgPSB0aGlzLmdldE5hbWVzcGFjZVZhbHVlKHNlbGVjdGVkVGVuYW50LCBpc1ByaXZhdGVFbmFibGVkLCB1c2VybmFtZSk7XG4gICAgICBfLmFzc2lnbihvcHRpb25zLCB7IG5hbWVzcGFjZTogW25hbWVzcGFjZVZhbHVlXSB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB3cmFwcGVyT3B0aW9ucy5jbGllbnQuYnVsa0dldChvYmplY3RzLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmluZFdpdGhOYW1lc3BhY2UgPSBhc3luYyA8VCA9IHVua25vd24+KFxuICAgICAgb3B0aW9uczogU2F2ZWRPYmplY3RzRmluZE9wdGlvbnNcbiAgICApOiBQcm9taXNlPFNhdmVkT2JqZWN0c0ZpbmRSZXNwb25zZTxUPj4gPT4ge1xuICAgICAgY29uc3QgdGVuYW50cyA9IHN0YXRlLmF1dGhJbmZvPy50ZW5hbnRzO1xuICAgICAgY29uc3QgYXZhaWxhYmxlVGVuYW50TmFtZXMgPSBPYmplY3Qua2V5cyh0ZW5hbnRzISk7XG4gICAgICBhdmFpbGFibGVUZW5hbnROYW1lcy5wdXNoKERFRkFVTFRfVEVOQU5UKTsgLy8gVGhlIHZhbHVlIG9mIG5hbWVzcGFjZSBpcyBcImRlZmF1bHRcIiBpZiBzYXZlZCBvYmplY3RzIGFyZSBjcmVhdGVkIHdoZW4gb3BlbnNlYXJjaF9zZWN1cml0eS5tdWx0aXRlbmFuY3kuZW5hYmxlX2FnZ3JlZ2F0aW9uX3ZpZXcgaXMgc2V0IHRvIGZhbHNlLiBTbyBhZGRpbmcgaXQgdG8gZmluZC5cbiAgICAgIGlmIChpc0dsb2JhbEVuYWJsZWQpIHtcbiAgICAgICAgYXZhaWxhYmxlVGVuYW50TmFtZXMucHVzaChHTE9CQUxfVEVOQU5UX1NZTUJPTCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNQcml2YXRlRW5hYmxlZCkge1xuICAgICAgICBhdmFpbGFibGVUZW5hbnROYW1lcy5wdXNoKFBSSVZBVEVfVEVOQU5UX1NZTUJPTCArIHVzZXJuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdmFpbGFibGVUZW5hbnROYW1lcy5pbmNsdWRlcyhnbG9iYWxUZW5hbnROYW1lKSkge1xuICAgICAgICBsZXQgaW5kZXggPSBhdmFpbGFibGVUZW5hbnROYW1lcy5pbmRleE9mKGdsb2JhbFRlbmFudE5hbWUpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIGF2YWlsYWJsZVRlbmFudE5hbWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXggPSBhdmFpbGFibGVUZW5hbnROYW1lcy5pbmRleE9mKHVzZXJuYW1lISk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgYXZhaWxhYmxlVGVuYW50TmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzUHJpdmF0ZVRlbmFudChzZWxlY3RlZFRlbmFudCEpKSB7XG4gICAgICAgIG5hbWVzcGFjZVZhbHVlID0gc2VsZWN0ZWRUZW5hbnQhICsgdXNlcm5hbWU7XG4gICAgICB9XG4gICAgICBpZiAoISFvcHRpb25zLm5hbWVzcGFjZXMpIHtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlc1RvSW5jbHVkZSA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5uYW1lc3BhY2VzKVxuICAgICAgICAgID8gb3B0aW9ucy5uYW1lc3BhY2VzXG4gICAgICAgICAgOiBbb3B0aW9ucy5uYW1lc3BhY2VzXTtcbiAgICAgICAgY29uc3QgdHlwZVRvTmFtZXNwYWNlc01hcDogYW55ID0ge307XG4gICAgICAgIGNvbnN0IHNlYXJjaFR5cGVzID0gQXJyYXkuaXNBcnJheShvcHRpb25zLnR5cGUpID8gb3B0aW9ucy50eXBlIDogW29wdGlvbnMudHlwZV07XG4gICAgICAgIHNlYXJjaFR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICB0eXBlVG9OYW1lc3BhY2VzTWFwW3RdID0gbmFtZXNwYWNlc1RvSW5jbHVkZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzZWFyY2hUeXBlcy5pbmNsdWRlcygnY29uZmlnJykpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlc1RvSW5jbHVkZS5pbmNsdWRlcyhuYW1lc3BhY2VWYWx1ZSkpIHtcbiAgICAgICAgICAgIHR5cGVUb05hbWVzcGFjZXNNYXAuY29uZmlnID0gW25hbWVzcGFjZVZhbHVlXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHR5cGVUb05hbWVzcGFjZXNNYXAuY29uZmlnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMudHlwZVRvTmFtZXNwYWNlc01hcCA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModHlwZVRvTmFtZXNwYWNlc01hcCkpO1xuICAgICAgICBvcHRpb25zLnR5cGUgPSAnJztcbiAgICAgICAgb3B0aW9ucy5uYW1lc3BhY2VzID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLm5hbWVzcGFjZXMgPSBbbmFtZXNwYWNlVmFsdWVdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgd3JhcHBlck9wdGlvbnMuY2xpZW50LmZpbmQob3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFdpdGhOYW1lc3BhY2UgPSBhc3luYyA8VCA9IHVua25vd24+KFxuICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgaWQ6IHN0cmluZyxcbiAgICAgIG9wdGlvbnM6IFNhdmVkT2JqZWN0c0Jhc2VPcHRpb25zID0ge31cbiAgICApOiBQcm9taXNlPFNhdmVkT2JqZWN0PFQ+PiA9PiB7XG4gICAgICBuYW1lc3BhY2VWYWx1ZSA9IHRoaXMuZ2V0TmFtZXNwYWNlVmFsdWUoc2VsZWN0ZWRUZW5hbnQsIGlzUHJpdmF0ZUVuYWJsZWQsIHVzZXJuYW1lKTtcbiAgICAgIF8uYXNzaWduKG9wdGlvbnMsIHsgbmFtZXNwYWNlOiBbbmFtZXNwYWNlVmFsdWVdIH0pO1xuICAgICAgcmV0dXJuIGF3YWl0IHdyYXBwZXJPcHRpb25zLmNsaWVudC5nZXQodHlwZSwgaWQsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVXaXRoTmFtZXNwYWNlID0gYXN5bmMgPFQgPSB1bmtub3duPihcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIGlkOiBzdHJpbmcsXG4gICAgICBhdHRyaWJ1dGVzOiBQYXJ0aWFsPFQ+LFxuICAgICAgb3B0aW9uczogU2F2ZWRPYmplY3RzVXBkYXRlT3B0aW9ucyA9IHt9XG4gICAgKTogUHJvbWlzZTxTYXZlZE9iamVjdHNVcGRhdGVSZXNwb25zZTxUPj4gPT4ge1xuICAgICAgbmFtZXNwYWNlVmFsdWUgPSB0aGlzLmdldE5hbWVzcGFjZVZhbHVlKHNlbGVjdGVkVGVuYW50LCBpc1ByaXZhdGVFbmFibGVkLCB1c2VybmFtZSk7XG4gICAgICBfLmFzc2lnbihvcHRpb25zLCB7IG5hbWVzcGFjZTogW25hbWVzcGFjZVZhbHVlXSB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB3cmFwcGVyT3B0aW9ucy5jbGllbnQudXBkYXRlKHR5cGUsIGlkLCBhdHRyaWJ1dGVzLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYnVsa0NyZWF0ZVdpdGhOYW1lc3BhY2UgPSBhc3luYyA8VCA9IHVua25vd24+KFxuICAgICAgb2JqZWN0czogQXJyYXk8U2F2ZWRPYmplY3RzQnVsa0NyZWF0ZU9iamVjdDxUPj4sXG4gICAgICBvcHRpb25zPzogU2F2ZWRPYmplY3RzQ3JlYXRlT3B0aW9uc1xuICAgICk6IFByb21pc2U8U2F2ZWRPYmplY3RzQnVsa1Jlc3BvbnNlPFQ+PiA9PiB7XG4gICAgICBuYW1lc3BhY2VWYWx1ZSA9IHRoaXMuZ2V0TmFtZXNwYWNlVmFsdWUoc2VsZWN0ZWRUZW5hbnQsIGlzUHJpdmF0ZUVuYWJsZWQsIHVzZXJuYW1lKTtcbiAgICAgIF8uYXNzaWduKG9wdGlvbnMsIHsgbmFtZXNwYWNlOiBbbmFtZXNwYWNlVmFsdWVdIH0pO1xuICAgICAgcmV0dXJuIGF3YWl0IHdyYXBwZXJPcHRpb25zLmNsaWVudC5idWxrQ3JlYXRlKG9iamVjdHMsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBjb25zdCBidWxrVXBkYXRlV2l0aE5hbWVzcGFjZSA9IGFzeW5jIDxUID0gdW5rbm93bj4oXG4gICAgICBvYmplY3RzOiBBcnJheTxTYXZlZE9iamVjdHNCdWxrVXBkYXRlT2JqZWN0PFQ+PixcbiAgICAgIG9wdGlvbnM/OiBTYXZlZE9iamVjdHNCdWxrVXBkYXRlT3B0aW9uc1xuICAgICk6IFByb21pc2U8U2F2ZWRPYmplY3RzQnVsa1VwZGF0ZVJlc3BvbnNlPFQ+PiA9PiB7XG4gICAgICBuYW1lc3BhY2VWYWx1ZSA9IHRoaXMuZ2V0TmFtZXNwYWNlVmFsdWUoc2VsZWN0ZWRUZW5hbnQsIGlzUHJpdmF0ZUVuYWJsZWQsIHVzZXJuYW1lKTtcbiAgICAgIF8uYXNzaWduKG9wdGlvbnMsIHsgbmFtZXNwYWNlOiBbbmFtZXNwYWNlVmFsdWVdIH0pO1xuICAgICAgcmV0dXJuIGF3YWl0IHdyYXBwZXJPcHRpb25zLmNsaWVudC5idWxrVXBkYXRlKG9iamVjdHMsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVXaXRoTmFtZXNwYWNlID0gYXN5bmMgKFxuICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgaWQ6IHN0cmluZyxcbiAgICAgIG9wdGlvbnM6IFNhdmVkT2JqZWN0c0RlbGV0ZU9wdGlvbnMgPSB7fVxuICAgICkgPT4ge1xuICAgICAgbmFtZXNwYWNlVmFsdWUgPSB0aGlzLmdldE5hbWVzcGFjZVZhbHVlKHNlbGVjdGVkVGVuYW50LCBpc1ByaXZhdGVFbmFibGVkLCB1c2VybmFtZSk7XG4gICAgICBfLmFzc2lnbihvcHRpb25zLCB7IG5hbWVzcGFjZTogW25hbWVzcGFjZVZhbHVlXSB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB3cmFwcGVyT3B0aW9ucy5jbGllbnQuZGVsZXRlKHR5cGUsIGlkLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hlY2tDb25mbGljdHNXaXRoTmFtZXNwYWNlID0gYXN5bmMgKFxuICAgICAgb2JqZWN0czogU2F2ZWRPYmplY3RzQ2hlY2tDb25mbGljdHNPYmplY3RbXSA9IFtdLFxuICAgICAgb3B0aW9uczogU2F2ZWRPYmplY3RzQmFzZU9wdGlvbnMgPSB7fVxuICAgICk6IFByb21pc2U8U2F2ZWRPYmplY3RzQ2hlY2tDb25mbGljdHNSZXNwb25zZT4gPT4ge1xuICAgICAgbmFtZXNwYWNlVmFsdWUgPSB0aGlzLmdldE5hbWVzcGFjZVZhbHVlKHNlbGVjdGVkVGVuYW50LCBpc1ByaXZhdGVFbmFibGVkLCB1c2VybmFtZSk7XG4gICAgICBfLmFzc2lnbihvcHRpb25zLCB7IG5hbWVzcGFjZTogW25hbWVzcGFjZVZhbHVlXSB9KTtcbiAgICAgIHJldHVybiBhd2FpdCB3cmFwcGVyT3B0aW9ucy5jbGllbnQuY2hlY2tDb25mbGljdHMob2JqZWN0cywgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi53cmFwcGVyT3B0aW9ucy5jbGllbnQsXG4gICAgICBnZXQ6IGdldFdpdGhOYW1lc3BhY2UsXG4gICAgICB1cGRhdGU6IHVwZGF0ZVdpdGhOYW1lc3BhY2UsXG4gICAgICBidWxrQ3JlYXRlOiBidWxrQ3JlYXRlV2l0aE5hbWVzcGFjZSxcbiAgICAgIGJ1bGtHZXQ6IGJ1bGtHZXRXaXRoTmFtZXNwYWNlLFxuICAgICAgYnVsa1VwZGF0ZTogYnVsa1VwZGF0ZVdpdGhOYW1lc3BhY2UsXG4gICAgICBjcmVhdGU6IGNyZWF0ZVdpdGhOYW1lc3BhY2UsXG4gICAgICBkZWxldGU6IGRlbGV0ZVdpdGhOYW1lc3BhY2UsXG4gICAgICBlcnJvcnM6IHdyYXBwZXJPcHRpb25zLmNsaWVudC5lcnJvcnMsXG4gICAgICBjaGVja0NvbmZsaWN0czogY2hlY2tDb25mbGljdHNXaXRoTmFtZXNwYWNlLFxuICAgICAgYWRkVG9OYW1lc3BhY2VzOiB3cmFwcGVyT3B0aW9ucy5jbGllbnQuYWRkVG9OYW1lc3BhY2VzLFxuICAgICAgZmluZDogZmluZFdpdGhOYW1lc3BhY2UsXG4gICAgICBkZWxldGVGcm9tTmFtZXNwYWNlczogd3JhcHBlck9wdGlvbnMuY2xpZW50LmRlbGV0ZUZyb21OYW1lc3BhY2VzLFxuICAgIH07XG4gIH07XG5cbiAgcHJpdmF0ZSBpc0FQcml2YXRlVGVuYW50KHNlbGVjdGVkVGVuYW50OiBzdHJpbmcgfCB1bmRlZmluZWQsIGlzUHJpdmF0ZUVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gc2VsZWN0ZWRUZW5hbnQgIT09IHVuZGVmaW5lZCAmJiBpc1ByaXZhdGVFbmFibGVkICYmIGlzUHJpdmF0ZVRlbmFudChzZWxlY3RlZFRlbmFudCk7XG4gIH1cblxuICBwcml2YXRlIGdldE5hbWVzcGFjZVZhbHVlKFxuICAgIHNlbGVjdGVkVGVuYW50OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgaXNQcml2YXRlRW5hYmxlZDogYm9vbGVhbixcbiAgICB1c2VybmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIGxldCBuYW1lc3BhY2VWYWx1ZSA9IHNlbGVjdGVkVGVuYW50O1xuICAgIGlmICh0aGlzLmlzQVByaXZhdGVUZW5hbnQoc2VsZWN0ZWRUZW5hbnQsIGlzUHJpdmF0ZUVuYWJsZWQpKSB7XG4gICAgICBuYW1lc3BhY2VWYWx1ZSA9IHNlbGVjdGVkVGVuYW50ISArIHVzZXJuYW1lO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXNwYWNlVmFsdWU7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBZUEsSUFBQUEsT0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBdUJBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQU1zQixTQUFBRCx1QkFBQUcsR0FBQSxXQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBLEtBQUFFLE9BQUEsRUFBQUYsR0FBQTtBQUFBLFNBQUFHLGdCQUFBSCxHQUFBLEVBQUFJLEdBQUEsRUFBQUMsS0FBQSxJQUFBRCxHQUFBLEdBQUFFLGNBQUEsQ0FBQUYsR0FBQSxPQUFBQSxHQUFBLElBQUFKLEdBQUEsSUFBQU8sTUFBQSxDQUFBQyxjQUFBLENBQUFSLEdBQUEsRUFBQUksR0FBQSxJQUFBQyxLQUFBLEVBQUFBLEtBQUEsRUFBQUksVUFBQSxRQUFBQyxZQUFBLFFBQUFDLFFBQUEsb0JBQUFYLEdBQUEsQ0FBQUksR0FBQSxJQUFBQyxLQUFBLFdBQUFMLEdBQUE7QUFBQSxTQUFBTSxlQUFBTSxHQUFB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