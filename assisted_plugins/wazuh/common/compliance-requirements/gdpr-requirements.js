"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gdprRequirementsFile = void 0;
/*
 * Wazuh app - Module for GDPR requirements
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const gdprRequirementsFile = exports.gdprRequirementsFile = {
  'II_5.1.f': 'Ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services, verifying its modifications, accesses, locations and guarantee the safety of them.File sharing protection and file sharing technologies that meet the requirements of data protection.',
  'III_14.2.c': ' Restrict the processing of personal data temporarily.',
  III_17: ' Permanently erase personal information of a subject.',
  'IV_24.2': 'Be able to demonstrate compliance with the GDPR by complying with data protection policies.',
  IV_28: ' Ensure data protection during processing, through technical and organizational measures.',
  'IV_30.1.g': 'It is necessary to keep all processing activities documented, to carry out an inventory of data from beginning to end and an audit, in order to know all the places where personal and sensitive data are located, processed, stored or transmitted.',
  'IV_32.1.c': 'Data Loss Prevention (DLP) capabilities to examine data flows and identify personal data that is not subject to adequate safeguards or authorizations. DLP tools can block or quarantine such data flows. Classify current data appropriately to determine specific categories of data that will be subject to the GDPR.',
  'IV_32.2': 'Account management tools that closely monitor actions taken by standard administrators and users who use standard or privileged account credentials are required to control access to data. ',
  IV_33: ' Notify the supervisory authority of a violation of the data in 72 hours and in certain cases, the injured parties.',
  'IV_35.1': 'Perform a data protection impact evaluation for high risk processes. Implement appropriate technical measures to safeguard the rights and freedoms of data subjects, informed by an assessment of the risks to these rights and freedoms.',
  'IV_35.7.d': 'Capabilities for identification, blocking and forensic investigation of data breaches by malicious actors, through compromised credentials, unauthorized network access, persistent threats and verification of the correct operation of all components.Network perimeter and endpoint security tools to prevent unauthorized access to the network, prevent the entry of unwanted data types and malicious threats. Anti-malware and anti-ransomware to prevent malware and ransomware threats from entering your devices.A behavioral analysis that uses machine intelligence to identify people who do anomalous things on the network, in order to give early visibility and alert employees who start to become corrupt.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZHByUmVxdWlyZW1lbnRzRmlsZSIsImV4cG9ydHMiLCJJSUlfMTciLCJJVl8yOCIsIklWXzMzIl0sInNvdXJjZXMiOlsiZ2Rwci1yZXF1aXJlbWVudHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIE1vZHVsZSBmb3IgR0RQUiByZXF1aXJlbWVudHNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5leHBvcnQgY29uc3QgZ2RwclJlcXVpcmVtZW50c0ZpbGUgPSB7XG4gICdJSV81LjEuZic6XG4gICAgJ0Vuc3VyZSB0aGUgb25nb2luZyBjb25maWRlbnRpYWxpdHksIGludGVncml0eSwgYXZhaWxhYmlsaXR5IGFuZCByZXNpbGllbmNlIG9mIHByb2Nlc3Npbmcgc3lzdGVtcyBhbmQgc2VydmljZXMsIHZlcmlmeWluZyBpdHMgbW9kaWZpY2F0aW9ucywgYWNjZXNzZXMsIGxvY2F0aW9ucyBhbmQgZ3VhcmFudGVlIHRoZSBzYWZldHkgb2YgdGhlbS5GaWxlIHNoYXJpbmcgcHJvdGVjdGlvbiBhbmQgZmlsZSBzaGFyaW5nIHRlY2hub2xvZ2llcyB0aGF0IG1lZXQgdGhlIHJlcXVpcmVtZW50cyBvZiBkYXRhIHByb3RlY3Rpb24uJyxcbiAgJ0lJSV8xNC4yLmMnOiAnIFJlc3RyaWN0IHRoZSBwcm9jZXNzaW5nIG9mIHBlcnNvbmFsIGRhdGEgdGVtcG9yYXJpbHkuJyxcbiAgSUlJXzE3OiAnIFBlcm1hbmVudGx5IGVyYXNlIHBlcnNvbmFsIGluZm9ybWF0aW9uIG9mIGEgc3ViamVjdC4nLFxuICAnSVZfMjQuMic6XG4gICAgJ0JlIGFibGUgdG8gZGVtb25zdHJhdGUgY29tcGxpYW5jZSB3aXRoIHRoZSBHRFBSIGJ5IGNvbXBseWluZyB3aXRoIGRhdGEgcHJvdGVjdGlvbiBwb2xpY2llcy4nLFxuICBJVl8yODpcbiAgICAnIEVuc3VyZSBkYXRhIHByb3RlY3Rpb24gZHVyaW5nIHByb2Nlc3NpbmcsIHRocm91Z2ggdGVjaG5pY2FsIGFuZCBvcmdhbml6YXRpb25hbCBtZWFzdXJlcy4nLFxuICAnSVZfMzAuMS5nJzpcbiAgICAnSXQgaXMgbmVjZXNzYXJ5IHRvIGtlZXAgYWxsIHByb2Nlc3NpbmcgYWN0aXZpdGllcyBkb2N1bWVudGVkLCB0byBjYXJyeSBvdXQgYW4gaW52ZW50b3J5IG9mIGRhdGEgZnJvbSBiZWdpbm5pbmcgdG8gZW5kIGFuZCBhbiBhdWRpdCwgaW4gb3JkZXIgdG8ga25vdyBhbGwgdGhlIHBsYWNlcyB3aGVyZSBwZXJzb25hbCBhbmQgc2Vuc2l0aXZlIGRhdGEgYXJlIGxvY2F0ZWQsIHByb2Nlc3NlZCwgc3RvcmVkIG9yIHRyYW5zbWl0dGVkLicsXG4gICdJVl8zMi4xLmMnOlxuICAgICdEYXRhIExvc3MgUHJldmVudGlvbiAoRExQKSBjYXBhYmlsaXRpZXMgdG8gZXhhbWluZSBkYXRhIGZsb3dzIGFuZCBpZGVudGlmeSBwZXJzb25hbCBkYXRhIHRoYXQgaXMgbm90IHN1YmplY3QgdG8gYWRlcXVhdGUgc2FmZWd1YXJkcyBvciBhdXRob3JpemF0aW9ucy4gRExQIHRvb2xzIGNhbiBibG9jayBvciBxdWFyYW50aW5lIHN1Y2ggZGF0YSBmbG93cy4gQ2xhc3NpZnkgY3VycmVudCBkYXRhIGFwcHJvcHJpYXRlbHkgdG8gZGV0ZXJtaW5lIHNwZWNpZmljIGNhdGVnb3JpZXMgb2YgZGF0YSB0aGF0IHdpbGwgYmUgc3ViamVjdCB0byB0aGUgR0RQUi4nLFxuICAnSVZfMzIuMic6XG4gICAgJ0FjY291bnQgbWFuYWdlbWVudCB0b29scyB0aGF0IGNsb3NlbHkgbW9uaXRvciBhY3Rpb25zIHRha2VuIGJ5IHN0YW5kYXJkIGFkbWluaXN0cmF0b3JzIGFuZCB1c2VycyB3aG8gdXNlIHN0YW5kYXJkIG9yIHByaXZpbGVnZWQgYWNjb3VudCBjcmVkZW50aWFscyBhcmUgcmVxdWlyZWQgdG8gY29udHJvbCBhY2Nlc3MgdG8gZGF0YS4gJyxcbiAgSVZfMzM6XG4gICAgJyBOb3RpZnkgdGhlIHN1cGVydmlzb3J5IGF1dGhvcml0eSBvZiBhIHZpb2xhdGlvbiBvZiB0aGUgZGF0YSBpbiA3MiBob3VycyBhbmQgaW4gY2VydGFpbiBjYXNlcywgdGhlIGluanVyZWQgcGFydGllcy4nLFxuICAnSVZfMzUuMSc6XG4gICAgJ1BlcmZvcm0gYSBkYXRhIHByb3RlY3Rpb24gaW1wYWN0IGV2YWx1YXRpb24gZm9yIGhpZ2ggcmlzayBwcm9jZXNzZXMuIEltcGxlbWVudCBhcHByb3ByaWF0ZSB0ZWNobmljYWwgbWVhc3VyZXMgdG8gc2FmZWd1YXJkIHRoZSByaWdodHMgYW5kIGZyZWVkb21zIG9mIGRhdGEgc3ViamVjdHMsIGluZm9ybWVkIGJ5IGFuIGFzc2Vzc21lbnQgb2YgdGhlIHJpc2tzIHRvIHRoZXNlIHJpZ2h0cyBhbmQgZnJlZWRvbXMuJyxcbiAgJ0lWXzM1LjcuZCc6XG4gICAgJ0NhcGFiaWxpdGllcyBmb3IgaWRlbnRpZmljYXRpb24sIGJsb2NraW5nIGFuZCBmb3JlbnNpYyBpbnZlc3RpZ2F0aW9uIG9mIGRhdGEgYnJlYWNoZXMgYnkgbWFsaWNpb3VzIGFjdG9ycywgdGhyb3VnaCBjb21wcm9taXNlZCBjcmVkZW50aWFscywgdW5hdXRob3JpemVkIG5ldHdvcmsgYWNjZXNzLCBwZXJzaXN0ZW50IHRocmVhdHMgYW5kIHZlcmlmaWNhdGlvbiBvZiB0aGUgY29ycmVjdCBvcGVyYXRpb24gb2YgYWxsIGNvbXBvbmVudHMuTmV0d29yayBwZXJpbWV0ZXIgYW5kIGVuZHBvaW50IHNlY3VyaXR5IHRvb2xzIHRvIHByZXZlbnQgdW5hdXRob3JpemVkIGFjY2VzcyB0byB0aGUgbmV0d29yaywgcHJldmVudCB0aGUgZW50cnkgb2YgdW53YW50ZWQgZGF0YSB0eXBlcyBhbmQgbWFsaWNpb3VzIHRocmVhdHMuIEFudGktbWFsd2FyZSBhbmQgYW50aS1yYW5zb213YXJlIHRvIHByZXZlbnQgbWFsd2FyZSBhbmQgcmFuc29td2FyZSB0aHJlYXRzIGZyb20gZW50ZXJpbmcgeW91ciBkZXZpY2VzLkEgYmVoYXZpb3JhbCBhbmFseXNpcyB0aGF0IHVzZXMgbWFjaGluZSBpbnRlbGxpZ2VuY2UgdG8gaWRlbnRpZnkgcGVvcGxlIHdobyBkbyBhbm9tYWxvdXMgdGhpbmdzIG9uIHRoZSBuZXR3b3JrLCBpbiBvcmRlciB0byBnaXZlIGVhcmx5IHZpc2liaWxpdHkgYW5kIGFsZXJ0IGVtcGxveWVlcyB3aG8gc3RhcnQgdG8gYmVjb21lIGNvcnJ1cHQuJ1xufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLG9CQUFvQixHQUFBQyxPQUFBLENBQUFELG9CQUFBLEdBQUc7RUFDbEMsVUFBVSxFQUNSLHVTQUF1UztFQUN6UyxZQUFZLEVBQUUsd0RBQXdEO0VBQ3RFRSxNQUFNLEVBQUUsdURBQXVEO0VBQy9ELFNBQVMsRUFDUCw2RkFBNkY7RUFDL0ZDLEtBQUssRUFDSCwyRkFBMkY7RUFDN0YsV0FBVyxFQUNULHNQQUFzUDtFQUN4UCxXQUFXLEVBQ1QsMFRBQTBUO0VBQzVULFNBQVMsRUFDUCw4TEFBOEw7RUFDaE1DLEtBQUssRUFDSCxxSEFBcUg7RUFDdkgsU0FBUyxFQUNQLDJPQUEyTztFQUM3TyxXQUFXLEVBQ1Q7QUFDSixDQUFDIn0=