"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMapLanguage = exports.fromMBtoBytes = void 0;
exports.isEscapeKey = isEscapeKey;
var _i18n = require("@osd/i18n");
var _index = require("./index");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const fromMBtoBytes = sizeInMB => {
  return sizeInMB * 1024 * 1024;
};
exports.fromMBtoBytes = fromMBtoBytes;
const getMapLanguage = () => {
  const OSDLanguage = _i18n.i18n.getLocale().toLowerCase(),
    parts = OSDLanguage.split('-');
  const languageCode = parts.length > 1 ? parts[0] : OSDLanguage;
  return _index.OSD_LANGUAGES.includes(languageCode) ? languageCode : _index.FALLBACK_LANGUAGE;
};
exports.getMapLanguage = getMapLanguage;
function isEscapeKey(e) {
  return e.code === 'Escape';
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfaTE4biIsInJlcXVpcmUiLCJfaW5kZXgiLCJmcm9tTUJ0b0J5dGVzIiwic2l6ZUluTUIiLCJleHBvcnRzIiwiZ2V0TWFwTGFuZ3VhZ2UiLCJPU0RMYW5ndWFnZSIsImkxOG4iLCJnZXRMb2NhbGUiLCJ0b0xvd2VyQ2FzZSIsInBhcnRzIiwic3BsaXQiLCJsYW5ndWFnZUNvZGUiLCJsZW5ndGgiLCJPU0RfTEFOR1VBR0VTIiwiaW5jbHVkZXMiLCJGQUxMQkFDS19MQU5HVUFHRSIsImlzRXNjYXBlS2V5IiwiZSIsImNvZGUiXSwic291cmNlcyI6WyJ1dGlsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cbmltcG9ydCB7IGkxOG4gfSBmcm9tICdAb3NkL2kxOG4nO1xuaW1wb3J0IHsgT1NEX0xBTkdVQUdFUywgRkFMTEJBQ0tfTEFOR1VBR0UgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IGZyb21NQnRvQnl0ZXMgPSAoc2l6ZUluTUI6IG51bWJlcikgPT4ge1xuICByZXR1cm4gc2l6ZUluTUIgKiAxMDI0ICogMTAyNDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRNYXBMYW5ndWFnZSA9ICgpID0+IHtcbiAgY29uc3QgT1NETGFuZ3VhZ2UgPSBpMThuLmdldExvY2FsZSgpLnRvTG93ZXJDYXNlKCksXG4gICAgcGFydHMgPSBPU0RMYW5ndWFnZS5zcGxpdCgnLScpO1xuICBjb25zdCBsYW5ndWFnZUNvZGUgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMF0gOiBPU0RMYW5ndWFnZTtcbiAgcmV0dXJuIE9TRF9MQU5HVUFHRVMuaW5jbHVkZXMobGFuZ3VhZ2VDb2RlKSA/IGxhbmd1YWdlQ29kZSA6IEZBTExCQUNLX0xBTkdVQUdFO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXNjYXBlS2V5KGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgcmV0dXJuIGUuY29kZSA9PT0gJ0VzY2FwZSc7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxJQUFBQSxLQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxNQUFBLEdBQUFELE9BQUE7QUFMQTtBQUNBO0FBQ0E7QUFDQTs7QUFJTyxNQUFNRSxhQUFhLEdBQUlDLFFBQWdCLElBQUs7RUFDakQsT0FBT0EsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJO0FBQy9CLENBQUM7QUFBQ0MsT0FBQSxDQUFBRixhQUFBLEdBQUFBLGFBQUE7QUFFSyxNQUFNRyxjQUFjLEdBQUdBLENBQUEsS0FBTTtFQUNsQyxNQUFNQyxXQUFXLEdBQUdDLFVBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFDaERDLEtBQUssR0FBR0osV0FBVyxDQUFDSyxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ2hDLE1BQU1DLFlBQVksR0FBR0YsS0FBSyxDQUFDRyxNQUFNLEdBQUcsQ0FBQyxHQUFHSCxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUdKLFdBQVc7RUFDOUQsT0FBT1Esb0JBQWEsQ0FBQ0MsUUFBUSxDQUFDSCxZQUFZLENBQUMsR0FBR0EsWUFBWSxHQUFHSSx3QkFBaUI7QUFDaEYsQ0FBQztBQUFDWixPQUFBLENBQUFDLGNBQUEsR0FBQUEsY0FBQTtBQUVLLFNBQVNZLFdBQVdBLENBQUNDLENBQWdCLEVBQUU7RUFDNUMsT0FBT0EsQ0FBQyxDQUFDQyxJQUFJLEtBQUssUUFBUTtBQUM1QiJ9