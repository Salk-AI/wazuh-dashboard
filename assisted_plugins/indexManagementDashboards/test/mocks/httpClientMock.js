"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const httpClientMock = jest.fn();
httpClientMock.delete = jest.fn();
httpClientMock.get = jest.fn();
httpClientMock.head = jest.fn();
httpClientMock.post = jest.fn();
httpClientMock.put = jest.fn();
httpClientMock.fetch = jest.fn();
var _default = exports.default = httpClientMock;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJodHRwQ2xpZW50TW9jayIsImplc3QiLCJmbiIsImRlbGV0ZSIsImdldCIsImhlYWQiLCJwb3N0IiwicHV0IiwiZmV0Y2giLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJkZWZhdWx0IiwibW9kdWxlIl0sInNvdXJjZXMiOlsiaHR0cENsaWVudE1vY2sudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwU2V0dXAgfSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3B1YmxpY1wiO1xuXG5jb25zdCBodHRwQ2xpZW50TW9jayA9IGplc3QuZm4oKSBhcyBhbnk7XG5cbmh0dHBDbGllbnRNb2NrLmRlbGV0ZSA9IGplc3QuZm4oKTtcbmh0dHBDbGllbnRNb2NrLmdldCA9IGplc3QuZm4oKTtcbmh0dHBDbGllbnRNb2NrLmhlYWQgPSBqZXN0LmZuKCk7XG5odHRwQ2xpZW50TW9jay5wb3N0ID0gamVzdC5mbigpO1xuaHR0cENsaWVudE1vY2sucHV0ID0gamVzdC5mbigpO1xuaHR0cENsaWVudE1vY2suZmV0Y2ggPSBqZXN0LmZuKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGh0dHBDbGllbnRNb2NrIGFzIEh0dHBTZXR1cDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBSUEsTUFBTUEsY0FBYyxHQUFHQyxJQUFJLENBQUNDLEVBQUUsQ0FBQyxDQUFRO0FBRXZDRixjQUFjLENBQUNHLE1BQU0sR0FBR0YsSUFBSSxDQUFDQyxFQUFFLENBQUMsQ0FBQztBQUNqQ0YsY0FBYyxDQUFDSSxHQUFHLEdBQUdILElBQUksQ0FBQ0MsRUFBRSxDQUFDLENBQUM7QUFDOUJGLGNBQWMsQ0FBQ0ssSUFBSSxHQUFHSixJQUFJLENBQUNDLEVBQUUsQ0FBQyxDQUFDO0FBQy9CRixjQUFjLENBQUNNLElBQUksR0FBR0wsSUFBSSxDQUFDQyxFQUFFLENBQUMsQ0FBQztBQUMvQkYsY0FBYyxDQUFDTyxHQUFHLEdBQUdOLElBQUksQ0FBQ0MsRUFBRSxDQUFDLENBQUM7QUFDOUJGLGNBQWMsQ0FBQ1EsS0FBSyxHQUFHUCxJQUFJLENBQUNDLEVBQUUsQ0FBQyxDQUFDO0FBQUMsSUFBQU8sUUFBQSxHQUFBQyxPQUFBLENBQUFDLE9BQUEsR0FFbEJYLGNBQWM7QUFBQVksTUFBQSxDQUFBRixPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsT0FBQSJ9