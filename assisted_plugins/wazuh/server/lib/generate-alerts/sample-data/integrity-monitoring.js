"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uid_after = exports.tags = exports.regulatory = exports.pathsWindows = exports.pathsLinux = exports.gid_after = exports.events = exports.attributes = void 0;
/*
 * Wazuh app - FIM sample alerts
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

const events = exports.events = ["modified", "deleted", "added"];
const attributes = exports.attributes = ["mtime", "inode", "size", "tmp", "md5", "sha1", "sha256"];
const pathsLinux = exports.pathsLinux = ["/etc/resolv.conf", "/var/wazuh/queue/fim/db/fim.db-journal", "/var/wazuh/queue/fim/db/fim.db", "/var/osquery/osquery.db/CURRENT", "/etc/sysconfig/network-scripts/ifcfg-eth1", "/etc/filebeat/fields.yml", "/var/log/lastlog", "/tmp/agent.conf", "/etc/elasticsearch/elasticsearch.yml", "/etc/elasticsearch/users", "/etc/elasticsearch/config", "/tmp/wazuh-config", "/run/utmp", "/etc/resolv.conf", "/var/wazuh/queue/fim/db/fim.db", "/var/osquery/osquery.db/CURRENT", "/run/utmp"];
const pathsWindows = exports.pathsWindows = ["[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\MpKslDrv", "[x32] HKEY_LOCAL_MACHINE\\Security\\SAM\\Domains\\Account\\Users\\000001F4", "[x32] HKEY_LOCAL_MACHINE\\Security\\SAM\\Domains\\Account\\Users\\000001F5", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{54b31d7e-36bf-4bbe-9ab2-106a939cd78c}", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\W32Time\\Config", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\W32Time\\SecureTimeLimits", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\W32Time\\SecureTimeLimits\\RunTime", "[x32] HKEY_LOCAL_MACHINE\\Security\\SAM\\Domains\\Account\\Users\\000001F7", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\SharedAccess\\Epoch", "c:\\programdata\\microsoft\\windows defender\\scans\\mpenginedb.db-wal", "c:\\program files (x86)\\wazuh-agent\\wodles\\syscollector", "c:\\program files (x86)\\wazuh-agent\\rids\\sender_counter", "c:\\program files (x86)\\wazuh-agent\\queue\\fim\\db\\fim.db", "c:\\program files (x86)\\wazuh-agent\\wazuh-agent.state", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\WinDefend", "[x32] HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Services\\bam\\State\\UserSettings\\S-1-5-21-856620481-996501011-1859314257-500"];
const uid_after = exports.uid_after = ["0", "S-1-5-18", "S-1-5-32-544", "996", "S-1-5-19"];
const gid_after = exports.gid_after = ["994", "0", "993", "190", "22"];
const tags = exports.tags = ["tmp"];
const regulatory = exports.regulatory = [{
  "firedtimes": 1,
  "mail": false,
  "level": 5,
  "pci_dss": ["11.5"],
  "hipaa": ["164.312.c.1", "164.312.c.2"],
  "description": "File added to the system.",
  "groups": ["wazuh", "syscheck"],
  "id": "554",
  "nist_800_53": ["SI.7"],
  "gpg13": ["4.11"],
  "gdpr": ["II_5.1.f"]
}, {
  "firedtimes": 2,
  "mail": false,
  "level": 7,
  "pci_dss": ["11.5"],
  "hipaa": ["164.312.c.1", "164.312.c.2"],
  "description": "Integrity checksum changed.",
  "groups": ["wazuh", "syscheck"],
  "id": "550",
  "nist_800_53": ["SI.7"],
  "gpg13": ["4.11"],
  "gdpr": ["II_5.1.f"]
}, {
  "firedtimes": 2,
  "mail": false,
  "level": 7,
  "pci_dss": ["11.5"],
  "hipaa": ["164.312.c.1", "164.312.c.2"],
  "description": "File deleted.",
  "groups": ["wazuh", "syscheck"],
  "id": "553",
  "nist_800_53": ["SI.7"],
  "gpg13": ["4.11"],
  "gdpr": ["II_5.1.f"]
}];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJldmVudHMiLCJleHBvcnRzIiwiYXR0cmlidXRlcyIsInBhdGhzTGludXgiLCJwYXRoc1dpbmRvd3MiLCJ1aWRfYWZ0ZXIiLCJnaWRfYWZ0ZXIiLCJ0YWdzIiwicmVndWxhdG9yeSJdLCJzb3VyY2VzIjpbImludGVncml0eS1tb25pdG9yaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBGSU0gc2FtcGxlIGFsZXJ0c1xuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGV2ZW50cyA9IFtcIm1vZGlmaWVkXCIsIFwiZGVsZXRlZFwiLCBcImFkZGVkXCJdO1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZXMgPSBbXCJtdGltZVwiLCBcImlub2RlXCIsIFwic2l6ZVwiLCBcInRtcFwiLCBcIm1kNVwiLCBcInNoYTFcIiwgXCJzaGEyNTZcIl07XG5leHBvcnQgY29uc3QgcGF0aHNMaW51eCA9IFtcbiAgXCIvZXRjL3Jlc29sdi5jb25mXCIsXG4gIFwiL3Zhci93YXp1aC9xdWV1ZS9maW0vZGIvZmltLmRiLWpvdXJuYWxcIixcbiAgXCIvdmFyL3dhenVoL3F1ZXVlL2ZpbS9kYi9maW0uZGJcIixcbiAgXCIvdmFyL29zcXVlcnkvb3NxdWVyeS5kYi9DVVJSRU5UXCIsXG4gIFwiL2V0Yy9zeXNjb25maWcvbmV0d29yay1zY3JpcHRzL2lmY2ZnLWV0aDFcIixcbiAgXCIvZXRjL2ZpbGViZWF0L2ZpZWxkcy55bWxcIixcbiAgXCIvdmFyL2xvZy9sYXN0bG9nXCIsXG4gIFwiL3RtcC9hZ2VudC5jb25mXCIsXG4gIFwiL2V0Yy9lbGFzdGljc2VhcmNoL2VsYXN0aWNzZWFyY2gueW1sXCIsXG4gIFwiL2V0Yy9lbGFzdGljc2VhcmNoL3VzZXJzXCIsXG4gIFwiL2V0Yy9lbGFzdGljc2VhcmNoL2NvbmZpZ1wiLFxuICBcIi90bXAvd2F6dWgtY29uZmlnXCIsXG4gIFwiL3J1bi91dG1wXCIsXG4gIFwiL2V0Yy9yZXNvbHYuY29uZlwiLFxuICBcIi92YXIvd2F6dWgvcXVldWUvZmltL2RiL2ZpbS5kYlwiLFxuICBcIi92YXIvb3NxdWVyeS9vc3F1ZXJ5LmRiL0NVUlJFTlRcIixcbiAgXCIvcnVuL3V0bXBcIlxuXTtcbmV4cG9ydCBjb25zdCBwYXRoc1dpbmRvd3MgPSBbXG4gIFwiW3gzMl0gSEtFWV9MT0NBTF9NQUNISU5FXFxcXFN5c3RlbVxcXFxDdXJyZW50Q29udHJvbFNldFxcXFxTZXJ2aWNlc1xcXFxNcEtzbERydlwiLFxuICBcIlt4MzJdIEhLRVlfTE9DQUxfTUFDSElORVxcXFxTZWN1cml0eVxcXFxTQU1cXFxcRG9tYWluc1xcXFxBY2NvdW50XFxcXFVzZXJzXFxcXDAwMDAwMUY0XCIsXG4gIFwiW3gzMl0gSEtFWV9MT0NBTF9NQUNISU5FXFxcXFNlY3VyaXR5XFxcXFNBTVxcXFxEb21haW5zXFxcXEFjY291bnRcXFxcVXNlcnNcXFxcMDAwMDAxRjVcIixcbiAgXCJbeDMyXSBIS0VZX0xPQ0FMX01BQ0hJTkVcXFxcU3lzdGVtXFxcXEN1cnJlbnRDb250cm9sU2V0XFxcXFNlcnZpY2VzXFxcXFRjcGlwXFxcXFBhcmFtZXRlcnNcXFxcSW50ZXJmYWNlc1xcXFx7NTRiMzFkN2UtMzZiZi00YmJlLTlhYjItMTA2YTkzOWNkNzhjfVwiLFxuICBcIlt4MzJdIEhLRVlfTE9DQUxfTUFDSElORVxcXFxTeXN0ZW1cXFxcQ3VycmVudENvbnRyb2xTZXRcXFxcU2VydmljZXNcXFxcVzMyVGltZVxcXFxDb25maWdcIixcbiAgXCJbeDMyXSBIS0VZX0xPQ0FMX01BQ0hJTkVcXFxcU3lzdGVtXFxcXEN1cnJlbnRDb250cm9sU2V0XFxcXFNlcnZpY2VzXFxcXFczMlRpbWVcXFxcU2VjdXJlVGltZUxpbWl0c1wiLFxuICBcIlt4MzJdIEhLRVlfTE9DQUxfTUFDSElORVxcXFxTeXN0ZW1cXFxcQ3VycmVudENvbnRyb2xTZXRcXFxcU2VydmljZXNcXFxcVzMyVGltZVxcXFxTZWN1cmVUaW1lTGltaXRzXFxcXFJ1blRpbWVcIixcbiAgXCJbeDMyXSBIS0VZX0xPQ0FMX01BQ0hJTkVcXFxcU2VjdXJpdHlcXFxcU0FNXFxcXERvbWFpbnNcXFxcQWNjb3VudFxcXFxVc2Vyc1xcXFwwMDAwMDFGN1wiLFxuICBcIlt4MzJdIEhLRVlfTE9DQUxfTUFDSElORVxcXFxTeXN0ZW1cXFxcQ3VycmVudENvbnRyb2xTZXRcXFxcU2VydmljZXNcXFxcU2hhcmVkQWNjZXNzXFxcXEVwb2NoXCIsXG4gIFwiYzpcXFxccHJvZ3JhbWRhdGFcXFxcbWljcm9zb2Z0XFxcXHdpbmRvd3MgZGVmZW5kZXJcXFxcc2NhbnNcXFxcbXBlbmdpbmVkYi5kYi13YWxcIixcbiAgXCJjOlxcXFxwcm9ncmFtIGZpbGVzICh4ODYpXFxcXHdhenVoLWFnZW50XFxcXHdvZGxlc1xcXFxzeXNjb2xsZWN0b3JcIixcbiAgXCJjOlxcXFxwcm9ncmFtIGZpbGVzICh4ODYpXFxcXHdhenVoLWFnZW50XFxcXHJpZHNcXFxcc2VuZGVyX2NvdW50ZXJcIixcbiAgXCJjOlxcXFxwcm9ncmFtIGZpbGVzICh4ODYpXFxcXHdhenVoLWFnZW50XFxcXHF1ZXVlXFxcXGZpbVxcXFxkYlxcXFxmaW0uZGJcIixcbiAgXCJjOlxcXFxwcm9ncmFtIGZpbGVzICh4ODYpXFxcXHdhenVoLWFnZW50XFxcXHdhenVoLWFnZW50LnN0YXRlXCIsXG4gIFwiW3gzMl0gSEtFWV9MT0NBTF9NQUNISU5FXFxcXFN5c3RlbVxcXFxDdXJyZW50Q29udHJvbFNldFxcXFxTZXJ2aWNlc1xcXFxXaW5EZWZlbmRcIixcbiAgXCJbeDMyXSBIS0VZX0xPQ0FMX01BQ0hJTkVcXFxcU3lzdGVtXFxcXEN1cnJlbnRDb250cm9sU2V0XFxcXFNlcnZpY2VzXFxcXGJhbVxcXFxTdGF0ZVxcXFxVc2VyU2V0dGluZ3NcXFxcUy0xLTUtMjEtODU2NjIwNDgxLTk5NjUwMTAxMS0xODU5MzE0MjU3LTUwMFwiLFxuXTtcbmV4cG9ydCBjb25zdCB1aWRfYWZ0ZXIgPSBbXCIwXCIsIFwiUy0xLTUtMThcIiwgXCJTLTEtNS0zMi01NDRcIiwgXCI5OTZcIiwgXCJTLTEtNS0xOVwiXTtcbmV4cG9ydCBjb25zdCBnaWRfYWZ0ZXIgPSBbXCI5OTRcIiwgXCIwXCIsIFwiOTkzXCIsIFwiMTkwXCIsIFwiMjJcIl07XG5leHBvcnQgY29uc3QgdGFncyA9IFtcInRtcFwiXTtcbmV4cG9ydCBjb25zdCByZWd1bGF0b3J5ID0gW3tcbiAgICBcImZpcmVkdGltZXNcIjogMSxcbiAgICBcIm1haWxcIjogZmFsc2UsXG4gICAgXCJsZXZlbFwiOiA1LFxuICAgIFwicGNpX2Rzc1wiOiBbXG4gICAgICBcIjExLjVcIlxuICAgIF0sXG4gICAgXCJoaXBhYVwiOiBbXG4gICAgICBcIjE2NC4zMTIuYy4xXCIsXG4gICAgICBcIjE2NC4zMTIuYy4yXCJcbiAgICBdLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJGaWxlIGFkZGVkIHRvIHRoZSBzeXN0ZW0uXCIsXG4gICAgXCJncm91cHNcIjogW1xuICAgICAgXCJ3YXp1aFwiLFxuICAgICAgXCJzeXNjaGVja1wiXG4gICAgXSxcbiAgICBcImlkXCI6IFwiNTU0XCIsXG4gICAgXCJuaXN0XzgwMF81M1wiOiBbXG4gICAgICBcIlNJLjdcIlxuICAgIF0sXG4gICAgXCJncGcxM1wiOiBbXG4gICAgICBcIjQuMTFcIlxuICAgIF0sXG4gICAgXCJnZHByXCI6IFtcbiAgICAgIFwiSUlfNS4xLmZcIlxuICAgIF1cbiAgfSxcbiAge1xuICAgIFwiZmlyZWR0aW1lc1wiOiAyLFxuICAgIFwibWFpbFwiOiBmYWxzZSxcbiAgICBcImxldmVsXCI6IDcsXG4gICAgXCJwY2lfZHNzXCI6IFtcbiAgICAgIFwiMTEuNVwiXG4gICAgXSxcbiAgICBcImhpcGFhXCI6IFtcbiAgICAgIFwiMTY0LjMxMi5jLjFcIixcbiAgICAgIFwiMTY0LjMxMi5jLjJcIlxuICAgIF0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkludGVncml0eSBjaGVja3N1bSBjaGFuZ2VkLlwiLFxuICAgIFwiZ3JvdXBzXCI6IFtcbiAgICAgIFwid2F6dWhcIixcbiAgICAgIFwic3lzY2hlY2tcIlxuICAgIF0sXG4gICAgXCJpZFwiOiBcIjU1MFwiLFxuICAgIFwibmlzdF84MDBfNTNcIjogW1xuICAgICAgXCJTSS43XCJcbiAgICBdLFxuICAgIFwiZ3BnMTNcIjogW1xuICAgICAgXCI0LjExXCJcbiAgICBdLFxuICAgIFwiZ2RwclwiOiBbXG4gICAgICBcIklJXzUuMS5mXCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZpcmVkdGltZXNcIjogMixcbiAgICBcIm1haWxcIjogZmFsc2UsXG4gICAgXCJsZXZlbFwiOiA3LFxuICAgIFwicGNpX2Rzc1wiOiBbXG4gICAgICBcIjExLjVcIlxuICAgIF0sXG4gICAgXCJoaXBhYVwiOiBbXG4gICAgICBcIjE2NC4zMTIuYy4xXCIsXG4gICAgICBcIjE2NC4zMTIuYy4yXCJcbiAgICBdLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJGaWxlIGRlbGV0ZWQuXCIsXG4gICAgXCJncm91cHNcIjogW1xuICAgICAgXCJ3YXp1aFwiLFxuICAgICAgXCJzeXNjaGVja1wiXG4gICAgXSxcbiAgICBcImlkXCI6IFwiNTUzXCIsXG4gICAgXCJuaXN0XzgwMF81M1wiOiBbXG4gICAgICBcIlNJLjdcIlxuICAgIF0sXG4gICAgXCJncGcxM1wiOiBbXG4gICAgICBcIjQuMTFcIlxuICAgIF0sXG4gICAgXCJnZHByXCI6IFtcbiAgICAgIFwiSUlfNS4xLmZcIlxuICAgIF1cbiAgfSxcbl07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sTUFBTUEsTUFBTSxHQUFBQyxPQUFBLENBQUFELE1BQUEsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDO0FBQy9DLE1BQU1FLFVBQVUsR0FBQUQsT0FBQSxDQUFBQyxVQUFBLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7QUFDN0UsTUFBTUMsVUFBVSxHQUFBRixPQUFBLENBQUFFLFVBQUEsR0FBRyxDQUN4QixrQkFBa0IsRUFDbEIsd0NBQXdDLEVBQ3hDLGdDQUFnQyxFQUNoQyxpQ0FBaUMsRUFDakMsMkNBQTJDLEVBQzNDLDBCQUEwQixFQUMxQixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLHNDQUFzQyxFQUN0QywwQkFBMEIsRUFDMUIsMkJBQTJCLEVBQzNCLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLGdDQUFnQyxFQUNoQyxpQ0FBaUMsRUFDakMsV0FBVyxDQUNaO0FBQ00sTUFBTUMsWUFBWSxHQUFBSCxPQUFBLENBQUFHLFlBQUEsR0FBRyxDQUMxQix5RUFBeUUsRUFDekUsNEVBQTRFLEVBQzVFLDRFQUE0RSxFQUM1RSxzSUFBc0ksRUFDdEksZ0ZBQWdGLEVBQ2hGLDBGQUEwRixFQUMxRixtR0FBbUcsRUFDbkcsNEVBQTRFLEVBQzVFLG9GQUFvRixFQUNwRix3RUFBd0UsRUFDeEUsNERBQTRELEVBQzVELDREQUE0RCxFQUM1RCw4REFBOEQsRUFDOUQseURBQXlELEVBQ3pELDBFQUEwRSxFQUMxRSxzSUFBc0ksQ0FDdkk7QUFDTSxNQUFNQyxTQUFTLEdBQUFKLE9BQUEsQ0FBQUksU0FBQSxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQztBQUN0RSxNQUFNQyxTQUFTLEdBQUFMLE9BQUEsQ0FBQUssU0FBQSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztBQUNsRCxNQUFNQyxJQUFJLEdBQUFOLE9BQUEsQ0FBQU0sSUFBQSxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3BCLE1BQU1DLFVBQVUsR0FBQVAsT0FBQSxDQUFBTyxVQUFBLEdBQUcsQ0FBQztFQUN2QixZQUFZLEVBQUUsQ0FBQztFQUNmLE1BQU0sRUFBRSxLQUFLO0VBQ2IsT0FBTyxFQUFFLENBQUM7RUFDVixTQUFTLEVBQUUsQ0FDVCxNQUFNLENBQ1A7RUFDRCxPQUFPLEVBQUUsQ0FDUCxhQUFhLEVBQ2IsYUFBYSxDQUNkO0VBQ0QsYUFBYSxFQUFFLDJCQUEyQjtFQUMxQyxRQUFRLEVBQUUsQ0FDUixPQUFPLEVBQ1AsVUFBVSxDQUNYO0VBQ0QsSUFBSSxFQUFFLEtBQUs7RUFDWCxhQUFhLEVBQUUsQ0FDYixNQUFNLENBQ1A7RUFDRCxPQUFPLEVBQUUsQ0FDUCxNQUFNLENBQ1A7RUFDRCxNQUFNLEVBQUUsQ0FDTixVQUFVO0FBRWQsQ0FBQyxFQUNEO0VBQ0UsWUFBWSxFQUFFLENBQUM7RUFDZixNQUFNLEVBQUUsS0FBSztFQUNiLE9BQU8sRUFBRSxDQUFDO0VBQ1YsU0FBUyxFQUFFLENBQ1QsTUFBTSxDQUNQO0VBQ0QsT0FBTyxFQUFFLENBQ1AsYUFBYSxFQUNiLGFBQWEsQ0FDZDtFQUNELGFBQWEsRUFBRSw2QkFBNkI7RUFDNUMsUUFBUSxFQUFFLENBQ1IsT0FBTyxFQUNQLFVBQVUsQ0FDWDtFQUNELElBQUksRUFBRSxLQUFLO0VBQ1gsYUFBYSxFQUFFLENBQ2IsTUFBTSxDQUNQO0VBQ0QsT0FBTyxFQUFFLENBQ1AsTUFBTSxDQUNQO0VBQ0QsTUFBTSxFQUFFLENBQ04sVUFBVTtBQUVkLENBQUMsRUFDRDtFQUNFLFlBQVksRUFBRSxDQUFDO0VBQ2YsTUFBTSxFQUFFLEtBQUs7RUFDYixPQUFPLEVBQUUsQ0FBQztFQUNWLFNBQVMsRUFBRSxDQUNULE1BQU0sQ0FDUDtFQUNELE9BQU8sRUFBRSxDQUNQLGFBQWEsRUFDYixhQUFhLENBQ2Q7RUFDRCxhQUFhLEVBQUUsZUFBZTtFQUM5QixRQUFRLEVBQUUsQ0FDUixPQUFPLEVBQ1AsVUFBVSxDQUNYO0VBQ0QsSUFBSSxFQUFFLEtBQUs7RUFDWCxhQUFhLEVBQUUsQ0FDYixNQUFNLENBQ1A7RUFDRCxPQUFPLEVBQUUsQ0FDUCxNQUFNLENBQ1A7RUFDRCxNQUFNLEVBQUUsQ0FDTixVQUFVO0FBRWQsQ0FBQyxDQUNGIn0=