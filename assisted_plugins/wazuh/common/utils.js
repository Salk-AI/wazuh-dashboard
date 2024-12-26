"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayAsPromise = void 0;
/**
 * 
 * @param timeMs Time in milliseconds
 * @returns Promise
 */
const delayAsPromise = timeMs => new Promise(resolve => setTimeout(resolve, timeMs));
exports.delayAsPromise = delayAsPromise;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZWxheUFzUHJvbWlzZSIsInRpbWVNcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsImV4cG9ydHMiXSwic291cmNlcyI6WyJ1dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFxuICogQHBhcmFtIHRpbWVNcyBUaW1lIGluIG1pbGxpc2Vjb25kc1xuICogQHJldHVybnMgUHJvbWlzZVxuICovXG5leHBvcnQgY29uc3QgZGVsYXlBc1Byb21pc2UgPSAodGltZU1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lTXMpKTsiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxjQUFjLEdBQUlDLE1BQWMsSUFBSyxJQUFJQyxPQUFPLENBQUNDLE9BQU8sSUFBSUMsVUFBVSxDQUFDRCxPQUFPLEVBQUVGLE1BQU0sQ0FBQyxDQUFDO0FBQUNJLE9BQUEsQ0FBQUwsY0FBQSxHQUFBQSxjQUFBIn0=