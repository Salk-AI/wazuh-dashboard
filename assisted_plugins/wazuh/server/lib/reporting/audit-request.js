"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopFailedSyscalls = exports.getTop3AgentsSudoNonSuccessful = exports.getTop3AgentsFailedSyscalls = void 0;
var _baseQuery = require("./base-query");
var _auditMap = _interopRequireDefault(require("./audit-map"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * Wazuh app - Specific methods to fetch Wazuh Audit data from Elasticsearch
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

/**
 * Returns top 3 agents that execute sudo commands without success
 * @param {*} context Endpoint context
 * @param {*} gte
 * @param {*} lte
 * @param {*} filters
 * @param {*} pattern
 */
const getTop3AgentsSudoNonSuccessful = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '3': {
        terms: {
          field: 'agent.id',
          size: 3,
          order: {
            _count: 'desc'
          }
        }
      }
    });
    base.query.bool.must.push({
      match_phrase: {
        'data.audit.uid': {
          query: '0'
        }
      }
    });
    base.query.bool.must.push({
      match_phrase: {
        'data.audit.success': {
          query: 'no'
        }
      }
    });
    base.query.bool.must_not.push({
      match_phrase: {
        'data.audit.auid': {
          query: '0'
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['3'];
    return buckets.map(item => item.key);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Returns the most failed syscall in the top 3 agents with failed system calls
 * @param {*} context Endpoint context
 * @param {*} gte
 * @param {*} lte
 * @param {*} filters
 * @param {*} pattern
 */
exports.getTop3AgentsSudoNonSuccessful = getTop3AgentsSudoNonSuccessful;
const getTop3AgentsFailedSyscalls = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '3': {
        terms: {
          field: 'agent.id',
          size: 3,
          order: {
            _count: 'desc'
          }
        },
        aggs: {
          '4': {
            terms: {
              field: 'data.audit.syscall',
              size: 1,
              order: {
                _count: 'desc'
              }
            }
          }
        }
      }
    });
    base.query.bool.must.push({
      match_phrase: {
        'data.audit.success': {
          query: 'no'
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['3'];
    return buckets.map(bucket => {
      try {
        const agent = bucket.key;
        const syscall = {
          id: bucket['4'].buckets[0].key,
          syscall: _auditMap.default[bucket['4'].buckets[0].key] || 'Warning: Unknown system call'
        };
        return {
          agent,
          syscall
        };
      } catch (error) {
        return undefined;
      }
    }).filter(bucket => bucket);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Returns the top failed syscalls
 * @param {*} context Endpoint context
 * @param {*} gte
 * @param {*} lte
 * @param {*} filters
 * @param {*} pattern
 */
exports.getTop3AgentsFailedSyscalls = getTop3AgentsFailedSyscalls;
const getTopFailedSyscalls = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'data.audit.syscall',
          size: 10,
          order: {
            _count: 'desc'
          }
        }
      }
    });
    base.query.bool.must.push({
      match_phrase: {
        'data.audit.success': {
          query: 'no'
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['2'];
    return buckets.map(item => ({
      id: item.key,
      syscall: _auditMap.default[item.key]
    }));
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.getTopFailedSyscalls = getTopFailedSyscalls;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYmFzZVF1ZXJ5IiwicmVxdWlyZSIsIl9hdWRpdE1hcCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImdldFRvcDNBZ2VudHNTdWRvTm9uU3VjY2Vzc2Z1bCIsImNvbnRleHQiLCJndGUiLCJsdGUiLCJmaWx0ZXJzIiwiYWxsb3dlZEFnZW50c0ZpbHRlciIsInBhdHRlcm4iLCJiYXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiQmFzZSIsImFnZ3MiLCJ0ZXJtcyIsImZpZWxkIiwic2l6ZSIsIm9yZGVyIiwiX2NvdW50IiwicXVlcnkiLCJib29sIiwibXVzdCIsInB1c2giLCJtYXRjaF9waHJhc2UiLCJtdXN0X25vdCIsInJlc3BvbnNlIiwiY29yZSIsIm9wZW5zZWFyY2giLCJjbGllbnQiLCJhc0N1cnJlbnRVc2VyIiwic2VhcmNoIiwiaW5kZXgiLCJib2R5IiwiYnVja2V0cyIsImFnZ3JlZ2F0aW9ucyIsIm1hcCIsIml0ZW0iLCJrZXkiLCJlcnJvciIsIlByb21pc2UiLCJyZWplY3QiLCJleHBvcnRzIiwiZ2V0VG9wM0FnZW50c0ZhaWxlZFN5c2NhbGxzIiwiYnVja2V0IiwiYWdlbnQiLCJzeXNjYWxsIiwiaWQiLCJBdWRpdE1hcCIsInVuZGVmaW5lZCIsImZpbHRlciIsImdldFRvcEZhaWxlZFN5c2NhbGxzIl0sInNvdXJjZXMiOlsiYXVkaXQtcmVxdWVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gU3BlY2lmaWMgbWV0aG9kcyB0byBmZXRjaCBXYXp1aCBBdWRpdCBkYXRhIGZyb20gRWxhc3RpY3NlYXJjaFxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmltcG9ydCB7IEJhc2UgfSBmcm9tICcuL2Jhc2UtcXVlcnknO1xuaW1wb3J0IEF1ZGl0TWFwIGZyb20gJy4vYXVkaXQtbWFwJztcblxuLyoqXG4gKiBSZXR1cm5zIHRvcCAzIGFnZW50cyB0aGF0IGV4ZWN1dGUgc3VkbyBjb21tYW5kcyB3aXRob3V0IHN1Y2Nlc3NcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0geyp9IGd0ZVxuICogQHBhcmFtIHsqfSBsdGVcbiAqIEBwYXJhbSB7Kn0gZmlsdGVyc1xuICogQHBhcmFtIHsqfSBwYXR0ZXJuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUb3AzQWdlbnRzU3Vkb05vblN1Y2Nlc3NmdWwgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICBwYXR0ZXJuLFxuKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgYmFzZSA9IHt9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLCBCYXNlKHBhdHRlcm4sIGZpbHRlcnMsIGd0ZSwgbHRlLCBhbGxvd2VkQWdlbnRzRmlsdGVyKSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UuYWdncywge1xuICAgICAgJzMnOiB7XG4gICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgZmllbGQ6ICdhZ2VudC5pZCcsXG4gICAgICAgICAgc2l6ZTogMyxcbiAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgX2NvdW50OiAnZGVzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5LmJvb2wubXVzdC5wdXNoKHtcbiAgICAgIG1hdGNoX3BocmFzZToge1xuICAgICAgICAnZGF0YS5hdWRpdC51aWQnOiB7XG4gICAgICAgICAgcXVlcnk6ICcwJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5LmJvb2wubXVzdC5wdXNoKHtcbiAgICAgIG1hdGNoX3BocmFzZToge1xuICAgICAgICAnZGF0YS5hdWRpdC5zdWNjZXNzJzoge1xuICAgICAgICAgIHF1ZXJ5OiAnbm8nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGJhc2UucXVlcnkuYm9vbC5tdXN0X25vdC5wdXNoKHtcbiAgICAgIG1hdGNoX3BocmFzZToge1xuICAgICAgICAnZGF0YS5hdWRpdC5hdWlkJzoge1xuICAgICAgICAgIHF1ZXJ5OiAnMCcsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goe1xuICAgICAgaW5kZXg6IHBhdHRlcm4sXG4gICAgICBib2R5OiBiYXNlLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgYnVja2V0cyB9ID0gcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnNbJzMnXTtcbiAgICByZXR1cm4gYnVja2V0cy5tYXAoaXRlbSA9PiBpdGVtLmtleSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtb3N0IGZhaWxlZCBzeXNjYWxsIGluIHRoZSB0b3AgMyBhZ2VudHMgd2l0aCBmYWlsZWQgc3lzdGVtIGNhbGxzXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgRW5kcG9pbnQgY29udGV4dFxuICogQHBhcmFtIHsqfSBndGVcbiAqIEBwYXJhbSB7Kn0gbHRlXG4gKiBAcGFyYW0geyp9IGZpbHRlcnNcbiAqIEBwYXJhbSB7Kn0gcGF0dGVyblxuICovXG5leHBvcnQgY29uc3QgZ2V0VG9wM0FnZW50c0ZhaWxlZFN5c2NhbGxzID0gYXN5bmMgKFxuICBjb250ZXh0LFxuICBndGUsXG4gIGx0ZSxcbiAgZmlsdGVycyxcbiAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgcGF0dGVybixcbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGJhc2UgPSB7fTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZSwgQmFzZShwYXR0ZXJuLCBmaWx0ZXJzLCBndGUsIGx0ZSwgYWxsb3dlZEFnZW50c0ZpbHRlcikpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLmFnZ3MsIHtcbiAgICAgICczJzoge1xuICAgICAgICB0ZXJtczoge1xuICAgICAgICAgIGZpZWxkOiAnYWdlbnQuaWQnLFxuICAgICAgICAgIHNpemU6IDMsXG4gICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGFnZ3M6IHtcbiAgICAgICAgICAnNCc6IHtcbiAgICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnZGF0YS5hdWRpdC5zeXNjYWxsJyxcbiAgICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgICAgICBfY291bnQ6ICdkZXNjJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5LmJvb2wubXVzdC5wdXNoKHtcbiAgICAgIG1hdGNoX3BocmFzZToge1xuICAgICAgICAnZGF0YS5hdWRpdC5zdWNjZXNzJzoge1xuICAgICAgICAgIHF1ZXJ5OiAnbm8nLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgIGluZGV4OiBwYXR0ZXJuLFxuICAgICAgYm9keTogYmFzZSxcbiAgICB9KTtcbiAgICBjb25zdCB7IGJ1Y2tldHMgfSA9IHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWyczJ107XG5cbiAgICByZXR1cm4gYnVja2V0c1xuICAgICAgLm1hcChidWNrZXQgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGFnZW50ID0gYnVja2V0LmtleTtcbiAgICAgICAgICBjb25zdCBzeXNjYWxsID0ge1xuICAgICAgICAgICAgaWQ6IGJ1Y2tldFsnNCddLmJ1Y2tldHNbMF0ua2V5LFxuICAgICAgICAgICAgc3lzY2FsbDpcbiAgICAgICAgICAgICAgQXVkaXRNYXBbYnVja2V0Wyc0J10uYnVja2V0c1swXS5rZXldIHx8XG4gICAgICAgICAgICAgICdXYXJuaW5nOiBVbmtub3duIHN5c3RlbSBjYWxsJyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhZ2VudCxcbiAgICAgICAgICAgIHN5c2NhbGwsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihidWNrZXQgPT4gYnVja2V0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHRvcCBmYWlsZWQgc3lzY2FsbHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0geyp9IGd0ZVxuICogQHBhcmFtIHsqfSBsdGVcbiAqIEBwYXJhbSB7Kn0gZmlsdGVyc1xuICogQHBhcmFtIHsqfSBwYXR0ZXJuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUb3BGYWlsZWRTeXNjYWxscyA9IGFzeW5jIChcbiAgY29udGV4dCxcbiAgZ3RlLFxuICBsdGUsXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4sXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMic6IHtcbiAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICBmaWVsZDogJ2RhdGEuYXVkaXQuc3lzY2FsbCcsXG4gICAgICAgICAgc2l6ZTogMTAsXG4gICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgIF9jb3VudDogJ2Rlc2MnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgYmFzZS5xdWVyeS5ib29sLm11c3QucHVzaCh7XG4gICAgICBtYXRjaF9waHJhc2U6IHtcbiAgICAgICAgJ2RhdGEuYXVkaXQuc3VjY2Vzcyc6IHtcbiAgICAgICAgICBxdWVyeTogJ25vJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLnNlYXJjaCh7XG4gICAgICBpbmRleDogcGF0dGVybixcbiAgICAgIGJvZHk6IGJhc2UsXG4gICAgfSk7XG4gICAgY29uc3QgeyBidWNrZXRzIH0gPSByZXNwb25zZS5ib2R5LmFnZ3JlZ2F0aW9uc1snMiddO1xuXG4gICAgcmV0dXJuIGJ1Y2tldHMubWFwKGl0ZW0gPT4gKHtcbiAgICAgIGlkOiBpdGVtLmtleSxcbiAgICAgIHN5c2NhbGw6IEF1ZGl0TWFwW2l0ZW0ua2V5XSxcbiAgICB9KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBV0EsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsU0FBQSxHQUFBQyxzQkFBQSxDQUFBRixPQUFBO0FBQW1DLFNBQUFFLHVCQUFBQyxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBWm5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU1HLDhCQUE4QixHQUFHLE1BQUFBLENBQzVDQyxPQUFPLEVBQ1BDLEdBQUcsRUFDSEMsR0FBRyxFQUNIQyxPQUFPLEVBQ1BDLG1CQUFtQixFQUNuQkMsT0FBTyxLQUNKO0VBQ0gsSUFBSTtJQUNGLE1BQU1DLElBQUksR0FBRyxDQUFDLENBQUM7SUFFZkMsTUFBTSxDQUFDQyxNQUFNLENBQUNGLElBQUksRUFBRSxJQUFBRyxlQUFJLEVBQUNKLE9BQU8sRUFBRUYsT0FBTyxFQUFFRixHQUFHLEVBQUVDLEdBQUcsRUFBRUUsbUJBQW1CLENBQUMsQ0FBQztJQUUxRUcsTUFBTSxDQUFDQyxNQUFNLENBQUNGLElBQUksQ0FBQ0ksSUFBSSxFQUFFO01BQ3ZCLEdBQUcsRUFBRTtRQUNIQyxLQUFLLEVBQUU7VUFDTEMsS0FBSyxFQUFFLFVBQVU7VUFDakJDLElBQUksRUFBRSxDQUFDO1VBQ1BDLEtBQUssRUFBRTtZQUNMQyxNQUFNLEVBQUU7VUFDVjtRQUNGO01BQ0Y7SUFDRixDQUFDLENBQUM7SUFFRlQsSUFBSSxDQUFDVSxL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