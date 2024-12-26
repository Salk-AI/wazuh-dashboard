"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCron = parseCron;
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _constants = require("../../common/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * Wazuh app - Module to transform seconds interval to cron readable format
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

function parseCron(interval) {
  try {
    if (!interval) throw new Error('Interval not found');
    const intervalToNumber = parseInt(interval);
    if (!intervalToNumber || typeof intervalToNumber !== 'number') {
      throw new Error('Interval not valid');
    }
    if (intervalToNumber < 60) {
      // 60 seconds / 1 minute
      throw new Error('Interval too low');
    }
    if (intervalToNumber >= 86400) {
      throw new Error('Interval too high');
    }
    const minutes = parseInt(intervalToNumber / 60);
    const cronstr = `0 */${minutes} * * * *`;
    if (!_nodeCron.default.validate(cronstr)) {
      throw new Error('Generated cron expression not valid for node-cron module');
    }
    return cronstr;
  } catch (error) {
    return _constants.WAZUH_MONITORING_DEFAULT_CRON_FREQ;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbm9kZUNyb24iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9jb25zdGFudHMiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsInBhcnNlQ3JvbiIsImludGVydmFsIiwiRXJyb3IiLCJpbnRlcnZhbFRvTnVtYmVyIiwicGFyc2VJbnQiLCJtaW51dGVzIiwiY3JvbnN0ciIsImNyb24iLCJ2YWxpZGF0ZSIsImVycm9yIiwiV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0NST05fRlJFUSJdLCJzb3VyY2VzIjpbInBhcnNlLWNyb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIE1vZHVsZSB0byB0cmFuc2Zvcm0gc2Vjb25kcyBpbnRlcnZhbCB0byBjcm9uIHJlYWRhYmxlIGZvcm1hdFxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmltcG9ydCBjcm9uIGZyb20gJ25vZGUtY3Jvbic7XG5pbXBvcnQgeyBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfQ1JPTl9GUkVRIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNyb24oaW50ZXJ2YWw6IHN0cmluZykge1xuICB0cnkge1xuICAgIGlmICghaW50ZXJ2YWwpIHRocm93IG5ldyBFcnJvcignSW50ZXJ2YWwgbm90IGZvdW5kJyk7XG5cbiAgICBjb25zdCBpbnRlcnZhbFRvTnVtYmVyOiBudW1iZXIgPSBwYXJzZUludChpbnRlcnZhbCk7XG5cbiAgICBpZiAoIWludGVydmFsVG9OdW1iZXIgfHwgdHlwZW9mIGludGVydmFsVG9OdW1iZXIgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVydmFsIG5vdCB2YWxpZCcpO1xuICAgIH1cbiAgICBpZiAoaW50ZXJ2YWxUb051bWJlciA8IDYwKSB7XG4gICAgICAvLyA2MCBzZWNvbmRzIC8gMSBtaW51dGVcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJ2YWwgdG9vIGxvdycpO1xuICAgIH1cbiAgICBpZiAoaW50ZXJ2YWxUb051bWJlciA+PSA4NjQwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlcnZhbCB0b28gaGlnaCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChpbnRlcnZhbFRvTnVtYmVyIC8gNjApO1xuXG4gICAgY29uc3QgY3JvbnN0ciA9IGAwICovJHttaW51dGVzfSAqICogKiAqYDtcblxuICAgIGlmICghY3Jvbi52YWxpZGF0ZShjcm9uc3RyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnR2VuZXJhdGVkIGNyb24gZXhwcmVzc2lvbiBub3QgdmFsaWQgZm9yIG5vZGUtY3JvbiBtb2R1bGUnLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyb25zdHI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUk9OX0ZSRVE7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBV0EsSUFBQUEsU0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsVUFBQSxHQUFBRCxPQUFBO0FBQTRFLFNBQUFELHVCQUFBRyxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBWjVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSU8sU0FBU0csU0FBU0EsQ0FBQ0MsUUFBZ0IsRUFBRTtFQUMxQyxJQUFJO0lBQ0YsSUFBSSxDQUFDQSxRQUFRLEVBQUUsTUFBTSxJQUFJQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7SUFFcEQsTUFBTUMsZ0JBQXdCLEdBQUdDLFFBQVEsQ0FBQ0gsUUFBUSxDQUFDO0lBRW5ELElBQUksQ0FBQ0UsZ0JBQWdCLElBQUksT0FBT0EsZ0JBQWdCLEtBQUssUUFBUSxFQUFFO01BQzdELE1BQU0sSUFBSUQsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0lBQ3ZDO0lBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBRSxFQUFFO01BQ3pCO01BQ0EsTUFBTSxJQUFJRCxLQUFLLENBQUMsa0JBQWtCLENBQUM7SUFDckM7SUFDQSxJQUFJQyxnQkFBZ0IsSUFBSSxLQUFLLEVBQUU7TUFDN0IsTUFBTSxJQUFJRCxLQUFLLENBQUMsbUJBQW1CLENBQUM7SUFDdEM7SUFFQSxNQUFNRyxPQUFPLEdBQUdELFFBQVEsQ0FBQ0QsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBRS9DLE1BQU1HLE9BQU8sR0FBSSxPQUFNRCxPQUFRLFVBQVM7SUFFeEMsSUFBSSxDQUFDRSxpQkFBSSxDQUFDQyxRQUFRLENBQUNGLE9BQU8sQ0FBQyxFQUFFO01BQzNCLE1BQU0sSUFBSUosS0FBSyxDQUNiLDBEQUNGLENBQUM7SUFDSDtJQUNBLE9BQU9JLE9BQU87RUFDaEIsQ0FBQyxDQUFDLE9BQU9HLEtBQUssRUFBRTtJQUNkLE9BQU9DLDZDQUFrQztFQUMzQztBQUNGIn0=