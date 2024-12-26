"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _constants = require("../utils/constants");
var _helpers = require("../utils/helpers");
var _DataStreamService = require("./DataStreamService");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
class ManagedIndexService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);
    // TODO: Not finished, need UI page that uses this first
    _defineProperty(this, "getManagedIndex", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id,
          index: _constants.INDEX.OPENDISTRO_ISM_CONFIG
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const results = await callWithRequest("search", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: results
          }
        });
      } catch (err) {
        console.error("Index Management - ManagedIndexService - getManagedIndex:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "getManagedIndices", async (context, request, response) => {
      try {
        const {
          from,
          size,
          sortDirection,
          sortField,
          terms,
          indices,
          dataStreams,
          showDataStreams
        } = request.query;
        const managedIndexSorts = {
          index: "managed_index.index",
          policyId: "managed_index.policy_id"
        };
        const explainParams = {
          sortField: sortField ? managedIndexSorts[sortField] : null,
          sortOrder: sortDirection,
          queryString: (0, _helpers.getSearchString)(terms, indices, dataStreams, showDataStreams),
          from: from,
          size: size
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const [explainAllResponse, indexToDataStreamMapping] = await Promise.all([callWithRequest("ism.explainAll", explainParams), (0, _DataStreamService.getIndexToDataStreamMapping)({
          callAsCurrentUser: callWithRequest
        })]);
        const managedIndices = [];
        for (const indexName in explainAllResponse) {
          if (indexName == "total_managed_indices") continue;
          const metadata = explainAllResponse[indexName];

          // If showDataStreams is not true, then skip the managed index if it belongs to a data stream.
          const parentDataStream = indexToDataStreamMapping[metadata.index] || null;
          if (!showDataStreams && parentDataStream !== null) continue;
          let policy, seqNo, primaryTerm, getResponse;
          try {
            getResponse = await callWithRequest("ism.getPolicy", {
              policyId: metadata.policy_id
            });
          } catch (err) {
            if (err.statusCode === 404 && err.body.error.reason === "Policy not found") {
              console.log("managed index with not existing policy");
            } else {
              throw err;
            }
          }
          policy = _lodash.default.get(getResponse, "policy", null);
          seqNo = _lodash.default.get(getResponse, "_seq_no", null);
          primaryTerm = _lodash.default.get(getResponse, "_primary_term", null);
          managedIndices.push({
            index: metadata.index,
            indexUuid: metadata.index_uuid,
            dataStream: parentDataStream,
            policyId: metadata.policy_id,
            policySeqNo: seqNo,
            policyPrimaryTerm: primaryTerm,
            policy: policy,
            enabled: metadata.enabled,
            managedIndexMetaData: (0, _helpers.transformManagedIndexMetaData)(metadata)
          });
        }
        let totalManagedIndices = explainAllResponse.total_managed_indices;
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              managedIndices: managedIndices,
              totalManagedIndices: totalManagedIndices
            }
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.type === "index_not_found_exception") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: {
                managedIndices: [],
                totalManagedIndices: 0
              }
            }
          });
        }
        console.error("Index Management - ManagedIndexService - getManagedIndices", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "retryManagedIndexPolicy", async (context, request, response) => {
      try {
        const {
          index,
          state = null
        } = request.body;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const params = {
          index: index.join(",")
        };
        if (state) params.body = {
          state
        };
        const retryResponse = await callWithRequest("ism.retry", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              failures: retryResponse.failures,
              updatedIndices: retryResponse.updated_indices,
              // TODO: remove ternary after fixing retry API to return empty array even if no failures
              failedIndices: retryResponse.failed_indices ? retryResponse.failed_indices.map(failedIndex => ({
                indexName: failedIndex.index_name,
                indexUuid: failedIndex.index_uuid,
                reason: failedIndex.reason
              })) : []
            }
          }
        });
      } catch (err) {
        console.error("Index Management - ManagedIndexService - retryManagedIndexPolicy:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "changePolicy", async (context, request, response) => {
      try {
        const {
          indices,
          policyId,
          include,
          state
        } = request.body;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const params = {
          index: indices.join(","),
          body: {
            policy_id: policyId,
            include,
            state
          }
        };
        const changeResponse = await callWithRequest("ism.change", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              failures: changeResponse.failures,
              updatedIndices: changeResponse.updated_indices,
              failedIndices: changeResponse.failed_indices.map(failedIndex => ({
                indexName: failedIndex.index_name,
                indexUuid: failedIndex.index_uuid,
                reason: failedIndex.reason
              }))
            }
          }
        });
      } catch (err) {
        console.error("Index Management - ManagedIndexService - changePolicy:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "removePolicy", async (context, request, response) => {
      try {
        const {
          indices
        } = request.body;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const params = {
          index: indices.join(",")
        };
        const addResponse = await callWithRequest("ism.remove", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              failures: addResponse.failures,
              updatedIndices: addResponse.updated_indices,
              failedIndices: addResponse.failed_indices.map(failedIndex => ({
                indexName: failedIndex.index_name,
                indexUuid: failedIndex.index_uuid,
                reason: failedIndex.reason
              }))
            }
          }
        });
      } catch (err) {
        console.error("Index Management - ManagedIndexService - removePolicy:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    this.osDriver = osDriver;
  }
}
exports.default = ManagedIndexService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfY29uc3RhbnRzIiwiX2hlbHBlcnMiLCJfRGF0YVN0cmVhbVNlcnZpY2UiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJNYW5hZ2VkSW5kZXhTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJvc0RyaXZlciIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJpZCIsInBhcmFtcyIsImluZGV4IiwiSU5ERVgiLCJPUEVORElTVFJPX0lTTV9DT05GSUciLCJjYWxsQXNDdXJyZW50VXNlciIsImNhbGxXaXRoUmVxdWVzdCIsImFzU2NvcGVkIiwicmVzdWx0cyIsImN1c3RvbSIsInN0YXR1c0NvZGUiLCJib2R5Iiwib2siLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiZnJvbSIsInNpemUiLCJzb3J0RGlyZWN0aW9uIiwic29ydEZpZWxkIiwidGVybXMiLCJpbmRpY2VzIiwiZGF0YVN0cmVhbXMiLCJzaG93RGF0YVN0cmVhbXMiLCJxdWVyeSIsIm1hbmFnZWRJbmRleFNvcnRzIiwicG9saWN5SWQiLCJleHBsYWluUGFyYW1zIiwic29ydE9yZGVyIiwicXVlcnlTdHJpbmciLCJnZXRTZWFyY2hTdHJpbmciLCJleHBsYWluQWxsUmVzcG9uc2UiLCJpbmRleFRvRGF0YVN0cmVhbU1hcHBpbmciLCJQcm9taXNlIiwiYWxsIiwiZ2V0SW5kZXhUb0RhdGFTdHJlYW1NYXBwaW5nIiwibWFuYWdlZEluZGljZXMiLCJpbmRleE5hbWUiLCJtZXRhZGF0YSIsInBhcmVudERhdGFTdHJlYW0iLCJwb2xpY3kiLCJzZXFObyIsInByaW1hcnlUZXJtIiwiZ2V0UmVzcG9uc2UiLCJwb2xpY3lfaWQiLCJyZWFzb24iLCJsb2ciLCJfIiwiZ2V0IiwicHVzaCIsImluZGV4VXVpZCIsImluZGV4X3V1aWQiLCJkYXRhU3RyZWFtIiwicG9saWN5U2VxTm8iLCJwb2xpY3lQcmltYXJ5VGVybSIsImVuYWJsZWQiLCJtYW5hZ2VkSW5kZXhNZXRhRGF0YSIsInRyYW5zZm9ybU1hbmFnZWRJbmRleE1ldGFEYXRhIiwidG90YWxNYW5hZ2VkSW5kaWNlcyIsInRvdGFsX21hbmFnZWRfaW5kaWNlcyIsInR5cGUiLCJzdGF0ZSIsImpvaW4iLCJyZXRyeVJlc3BvbnNlIiwiZmFpbHVyZXMiLCJ1cGRhdGVkSW5kaWNlcyIsInVwZGF0ZWRfaW5kaWNlcyIsImZhaWxlZEluZGljZXMiLCJmYWlsZWRfaW5kaWNlcyIsIm1hcCIsImZhaWxlZEluZGV4IiwiaW5kZXhfbmFtZSIsImluY2x1ZGUiLCJjaGFuZ2VSZXNwb25zZSIsImFkZFJlc3BvbnNlIiwiZXhwb3J0cyIsIm1vZHVsZSJdLCJzb3VyY2VzIjpbIk1hbmFnZWRJbmRleFNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBSZXF1ZXN0UGFyYW1zIH0gZnJvbSBcIkBlbGFzdGljL2VsYXN0aWNzZWFyY2hcIjtcbmltcG9ydCB7XG4gIFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2UsXG4gIElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50LFxufSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlclwiO1xuaW1wb3J0IHsgSU5ERVggfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRTZWFyY2hTdHJpbmcsIHRyYW5zZm9ybU1hbmFnZWRJbmRleE1ldGFEYXRhIH0gZnJvbSBcIi4uL3V0aWxzL2hlbHBlcnNcIjtcbmltcG9ydCB7XG4gIENoYW5nZVBvbGljeVJlc3BvbnNlLFxuICBFeHBsYWluQWxsUmVzcG9uc2UsXG4gIEV4cGxhaW5BUElNYW5hZ2VkSW5kZXhNZXRhRGF0YSxcbiAgR2V0TWFuYWdlZEluZGljZXNSZXNwb25zZSxcbiAgUmVtb3ZlUG9saWN5UmVzcG9uc2UsXG4gIFJlbW92ZVJlc3BvbnNlLFxuICBSZXRyeU1hbmFnZWRJbmRleFJlc3BvbnNlLFxuICBSZXRyeVBhcmFtcyxcbiAgUmV0cnlSZXNwb25zZSxcbiAgU2VhcmNoUmVzcG9uc2UsXG59IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgTWFuYWdlZEluZGljZXNTb3J0LCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvdHlwZXNcIjtcbmltcG9ydCB7IE1hbmFnZWRJbmRleEl0ZW0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IGdldEluZGV4VG9EYXRhU3RyZWFtTWFwcGluZyB9IGZyb20gXCIuL0RhdGFTdHJlYW1TZXJ2aWNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZWRJbmRleFNlcnZpY2Uge1xuICBvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3NEcml2ZXI6IElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50KSB7XG4gICAgdGhpcy5vc0RyaXZlciA9IG9zRHJpdmVyO1xuICB9XG5cbiAgLy8gVE9ETzogTm90IGZpbmlzaGVkLCBuZWVkIFVJIHBhZ2UgdGhhdCB1c2VzIHRoaXMgZmlyc3RcbiAgZ2V0TWFuYWdlZEluZGV4ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8YW55Pj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXM6IFJlcXVlc3RQYXJhbXMuR2V0ID0geyBpZCwgaW5kZXg6IElOREVYLk9QRU5ESVNUUk9fSVNNX0NPTkZJRyB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzdWx0czogU2VhcmNoUmVzcG9uc2U8YW55PiA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNlYXJjaFwiLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXN1bHRzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIE1hbmFnZWRJbmRleFNlcnZpY2UgLSBnZXRNYW5hZ2VkSW5kZXg6XCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRNYW5hZ2VkSW5kaWNlcyA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldE1hbmFnZWRJbmRpY2VzUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGZyb20sIHNpemUsIHNvcnREaXJlY3Rpb24sIHNvcnRGaWVsZCwgdGVybXMsIGluZGljZXMsIGRhdGFTdHJlYW1zLCBzaG93RGF0YVN0cmVhbXMgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICBmcm9tOiBzdHJpbmc7XG4gICAgICAgIHNpemU6IHN0cmluZztcbiAgICAgICAgc2VhcmNoOiBzdHJpbmc7XG4gICAgICAgIHNvcnREaXJlY3Rpb246IHN0cmluZztcbiAgICAgICAgc29ydEZpZWxkOiBzdHJpbmc7XG4gICAgICAgIHRlcm1zPzogc3RyaW5nW107XG4gICAgICAgIGluZGljZXM/OiBzdHJpbmdbXTtcbiAgICAgICAgZGF0YVN0cmVhbXM/OiBzdHJpbmdbXTtcbiAgICAgICAgc2hvd0RhdGFTdHJlYW1zOiBib29sZWFuO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgbWFuYWdlZEluZGV4U29ydHM6IE1hbmFnZWRJbmRpY2VzU29ydCA9IHsgaW5kZXg6IFwibWFuYWdlZF9pbmRleC5pbmRleFwiLCBwb2xpY3lJZDogXCJtYW5hZ2VkX2luZGV4LnBvbGljeV9pZFwiIH07XG4gICAgICBjb25zdCBleHBsYWluUGFyYW1zID0ge1xuICAgICAgICBzb3J0RmllbGQ6IHNvcnRGaWVsZCA/IG1hbmFnZWRJbmRleFNvcnRzW3NvcnRGaWVsZF0gOiBudWxsLFxuICAgICAgICBzb3J0T3JkZXI6IHNvcnREaXJlY3Rpb24sXG4gICAgICAgIHF1ZXJ5U3RyaW5nOiBnZXRTZWFyY2hTdHJpbmcodGVybXMsIGluZGljZXMsIGRhdGFTdHJlYW1zLCBzaG93RGF0YVN0cmVhbXMpLFxuICAgICAgICBmcm9tOiBmcm9tLFxuICAgICAgICBzaXplOiBzaXplXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBbZXhwbGFpbkFsbFJlc3BvbnNlLCBpbmRleFRvRGF0YVN0cmVhbU1hcHBpbmddID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZXhwbGFpbkFsbFwiLCBleHBsYWluUGFyYW1zKSBhcyBQcm9taXNlPEV4cGxhaW5BbGxSZXNwb25zZT4sXG4gICAgICAgIGdldEluZGV4VG9EYXRhU3RyZWFtTWFwcGluZyh7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSksXG4gICAgICBdKTtcbiAgICAgIGNvbnN0IG1hbmFnZWRJbmRpY2VzOiBNYW5hZ2VkSW5kZXhJdGVtW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaW5kZXhOYW1lIGluIGV4cGxhaW5BbGxSZXNwb25zZSkge1xuICAgICAgICBpZiAoaW5kZXhOYW1lID09IFwidG90YWxfbWFuYWdlZF9pbmRpY2VzXCIpIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGV4cGxhaW5BbGxSZXNwb25zZVtpbmRleE5hbWVdIGFzIEV4cGxhaW5BUElNYW5hZ2VkSW5kZXhNZXRhRGF0YTtcblxuICAgICAgICAvLyBJZiBzaG93RGF0YVN0cmVhbXMgaXMgbm90IHRydWUsIHRoZW4gc2tpcCB0aGUgbWFuYWdlZCBpbmRleCBpZiBpdCBiZWxvbmdzIHRvIGEgZGF0YSBzdHJlYW0uXG4gICAgICAgIGNvbnN0IHBhcmVudERhdGFTdHJlYW0gPSBpbmRleFRvRGF0YVN0cmVhbU1hcHBpbmdbbWV0YWRhdGEuaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIGlmICghc2hvd0RhdGFTdHJlYW1zICYmIHBhcmVudERhdGFTdHJlYW0gIT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICBsZXQgcG9saWN5LCBzZXFObywgcHJpbWFyeVRlcm0sIGdldFJlc3BvbnNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmdldFBvbGljeVwiLCB7IHBvbGljeUlkOiBtZXRhZGF0YS5wb2xpY3lfaWQgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0ICYmIGVyci5ib2R5LmVycm9yLnJlYXNvbiA9PT0gXCJQb2xpY3kgbm90IGZvdW5kXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFuYWdlZCBpbmRleCB3aXRoIG5vdCBleGlzdGluZyBwb2xpY3lcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9saWN5ID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwicG9saWN5XCIsIG51bGwpO1xuICAgICAgICBzZXFObyA9IF8uZ2V0KGdldFJlc3BvbnNlLCBcIl9zZXFfbm9cIiwgbnVsbCk7XG4gICAgICAgIHByaW1hcnlUZXJtID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwiX3ByaW1hcnlfdGVybVwiLCBudWxsKTtcbiAgICAgICAgbWFuYWdlZEluZGljZXMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6IG1ldGFkYXRhLmluZGV4LFxuICAgICAgICAgIGluZGV4VXVpZDogbWV0YWRhdGEuaW5kZXhfdXVpZCxcbiAgICAgICAgICBkYXRhU3RyZWFtOiBwYXJlbnREYXRhU3RyZWFtLFxuICAgICAgICAgIHBvbGljeUlkOiBtZXRhZGF0YS5wb2xpY3lfaWQsXG4gICAgICAgICAgcG9saWN5U2VxTm86IHNlcU5vLFxuICAgICAgICAgIHBvbGljeVByaW1hcnlUZXJtOiBwcmltYXJ5VGVybSxcbiAgICAgICAgICBwb2xpY3k6IHBvbGljeSxcbiAgICAgICAgICBlbmFibGVkOiBtZXRhZGF0YS5lbmFibGVkLFxuICAgICAgICAgIG1hbmFnZWRJbmRleE1ldGFEYXRhOiB0cmFuc2Zvcm1NYW5hZ2VkSW5kZXhNZXRhRGF0YShtZXRhZGF0YSksXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgdG90YWxNYW5hZ2VkSW5kaWNlcyA9IGV4cGxhaW5BbGxSZXNwb25zZS50b3RhbF9tYW5hZ2VkX2luZGljZXM7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHsgbWFuYWdlZEluZGljZXM6IG1hbmFnZWRJbmRpY2VzLCB0b3RhbE1hbmFnZWRJbmRpY2VzOiB0b3RhbE1hbmFnZWRJbmRpY2VzfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5zdGF0dXNDb2RlID09PSA0MDQgJiYgZXJyLmJvZHkuZXJyb3IudHlwZSA9PT0gXCJpbmRleF9ub3RfZm91bmRfZXhjZXB0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHsgbWFuYWdlZEluZGljZXM6IFtdLCB0b3RhbE1hbmFnZWRJbmRpY2VzOiAwIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIE1hbmFnZWRJbmRleFNlcnZpY2UgLSBnZXRNYW5hZ2VkSW5kaWNlc1wiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0cnlNYW5hZ2VkSW5kZXhQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxSZXRyeU1hbmFnZWRJbmRleFJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpbmRleCwgc3RhdGUgPSBudWxsIH0gPSByZXF1ZXN0LmJvZHkgYXMgeyBpbmRleDogc3RyaW5nW107IHN0YXRlPzogc3RyaW5nIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBwYXJhbXM6IFJldHJ5UGFyYW1zID0geyBpbmRleDogaW5kZXguam9pbihcIixcIikgfTtcbiAgICAgIGlmIChzdGF0ZSkgcGFyYW1zLmJvZHkgPSB7IHN0YXRlIH07XG4gICAgICBjb25zdCByZXRyeVJlc3BvbnNlOiBSZXRyeVJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLnJldHJ5XCIsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgIGZhaWx1cmVzOiByZXRyeVJlc3BvbnNlLmZhaWx1cmVzLFxuICAgICAgICAgICAgdXBkYXRlZEluZGljZXM6IHJldHJ5UmVzcG9uc2UudXBkYXRlZF9pbmRpY2VzLFxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlIHRlcm5hcnkgYWZ0ZXIgZml4aW5nIHJldHJ5IEFQSSB0byByZXR1cm4gZW1wdHkgYXJyYXkgZXZlbiBpZiBubyBmYWlsdXJlc1xuICAgICAgICAgICAgZmFpbGVkSW5kaWNlczogcmV0cnlSZXNwb25zZS5mYWlsZWRfaW5kaWNlc1xuICAgICAgICAgICAgICA/IHJldHJ5UmVzcG9uc2UuZmFpbGVkX2luZGljZXMubWFwKChmYWlsZWRJbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIGluZGV4TmFtZTogZmFpbGVkSW5kZXguaW5kZXhfbmFtZSxcbiAgICAgICAgICAgICAgICAgIGluZGV4VXVpZDogZmFpbGVkSW5kZXguaW5kZXhfdXVpZCxcbiAgICAgICAgICAgICAgICAgIHJlYXNvbjogZmFpbGVkSW5kZXgucmVhc29uLFxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gTWFuYWdlZEluZGV4U2VydmljZSAtIHJldHJ5TWFuYWdlZEluZGV4UG9saWN5OlwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY2hhbmdlUG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Q2hhbmdlUG9saWN5UmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGluZGljZXMsIHBvbGljeUlkLCBpbmNsdWRlLCBzdGF0ZSB9ID0gcmVxdWVzdC5ib2R5IGFzIHtcbiAgICAgICAgaW5kaWNlczogc3RyaW5nW107XG4gICAgICAgIHBvbGljeUlkOiBzdHJpbmc7XG4gICAgICAgIHN0YXRlOiBzdHJpbmcgfCBudWxsO1xuICAgICAgICBpbmNsdWRlOiB7IHN0YXRlOiBzdHJpbmcgfVtdO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaW5kZXg6IGluZGljZXMuam9pbihcIixcIiksIGJvZHk6IHsgcG9saWN5X2lkOiBwb2xpY3lJZCwgaW5jbHVkZSwgc3RhdGUgfSB9O1xuICAgICAgY29uc3QgY2hhbmdlUmVzcG9uc2U6IFJlbW92ZVJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmNoYW5nZVwiLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICBmYWlsdXJlczogY2hhbmdlUmVzcG9uc2UuZmFpbHVyZXMsXG4gICAgICAgICAgICB1cGRhdGVkSW5kaWNlczogY2hhbmdlUmVzcG9uc2UudXBkYXRlZF9pbmRpY2VzLFxuICAgICAgICAgICAgZmFpbGVkSW5kaWNlczogY2hhbmdlUmVzcG9uc2UuZmFpbGVkX2luZGljZXMubWFwKChmYWlsZWRJbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgaW5kZXhOYW1lOiBmYWlsZWRJbmRleC5pbmRleF9uYW1lLFxuICAgICAgICAgICAgICBpbmRleFV1aWQ6IGZhaWxlZEluZGV4LmluZGV4X3V1aWQsXG4gICAgICAgICAgICAgIHJlYXNvbjogZmFpbGVkSW5kZXgucmVhc29uLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gTWFuYWdlZEluZGV4U2VydmljZSAtIGNoYW5nZVBvbGljeTpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJlbW92ZVBvbGljeSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPFJlbW92ZVBvbGljeVJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpbmRpY2VzIH0gPSByZXF1ZXN0LmJvZHkgYXMgeyBpbmRpY2VzOiBzdHJpbmdbXSB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBpbmRleDogaW5kaWNlcy5qb2luKFwiLFwiKSB9O1xuICAgICAgY29uc3QgYWRkUmVzcG9uc2U6IFJlbW92ZVJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLnJlbW92ZVwiLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICBmYWlsdXJlczogYWRkUmVzcG9uc2UuZmFpbHVyZXMsXG4gICAgICAgICAgICB1cGRhdGVkSW5kaWNlczogYWRkUmVzcG9uc2UudXBkYXRlZF9pbmRpY2VzLFxuICAgICAgICAgICAgZmFpbGVkSW5kaWNlczogYWRkUmVzcG9uc2UuZmFpbGVkX2luZGljZXMubWFwKChmYWlsZWRJbmRleCkgPT4gKHtcbiAgICAgICAgICAgICAgaW5kZXhOYW1lOiBmYWlsZWRJbmRleC5pbmRleF9uYW1lLFxuICAgICAgICAgICAgICBpbmRleFV1aWQ6IGZhaWxlZEluZGV4LmluZGV4X3V1aWQsXG4gICAgICAgICAgICAgIHJlYXNvbjogZmFpbGVkSW5kZXgucmVhc29uLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gTWFuYWdlZEluZGV4U2VydmljZSAtIHJlbW92ZVBvbGljeTpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFTQSxJQUFBQyxVQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxRQUFBLEdBQUFGLE9BQUE7QUFlQSxJQUFBRyxrQkFBQSxHQUFBSCxPQUFBO0FBQWtFLFNBQUFELHVCQUFBSyxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBQUEsU0FBQUcsZ0JBQUFILEdBQUEsRUFBQUksR0FBQSxFQUFBQyxLQUFBLElBQUFELEdBQUEsR0FBQUUsY0FBQSxDQUFBRixHQUFBLE9BQUFBLEdBQUEsSUFBQUosR0FBQSxJQUFBTyxNQUFBLENBQUFDLGNBQUEsQ0FBQVIsR0FBQSxFQUFBSSxHQUFBLElBQUFDLEtBQUEsRUFBQUEsS0FBQSxFQUFBSSxVQUFBLFFBQUFDLFlBQUEsUUFBQUMsUUFBQSxvQkFBQVgsR0FBQSxDQUFBSSxHQUFBLElBQUFDLEtBQUEsV0FBQUwsR0FBQTtBQUFBLFNBQUFNLGVBQUFNLEdBQUEsUUFBQVIsR0FBQSxHQUFBUyxZQUFBLENBQUFELEdBQUEsMkJBQUFS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