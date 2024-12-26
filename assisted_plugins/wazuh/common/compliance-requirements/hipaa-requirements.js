"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hipaaRequirementsFile = void 0;
/*
 * Wazuh app - Module for HIPAA requirements
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const hipaaRequirementsFile = exports.hipaaRequirementsFile = {
  '164.312.a.1': 'Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have access.',
  '164.312.a.2.I': 'Assign a unique name and/or number for identifying and tracking user identity.',
  '164.312.a.2.II': 'Establish (and implement as needed) procedures for obtaining necessary electronic protected health information during an emergency.',
  '164.312.a.2.III': 'Implement electronic procedures that terminate an electronic session  after a predetermined time of inactivity.',
  '164.312.a.2.IV': 'Implement a mechanism to encrypt and decrypt electronic protected health information.',
  '164.312.b': 'Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.',
  '164.312.c.1': 'Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.',
  '164.312.c.2': 'Implement electronic mechanisms to corroborate that electronic protected health information has not been altered or destroyed in an unauthorized manner.',
  '164.312.d': 'Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.',
  '164.312.e.1': 'Implement technical security measures to guard against unauthorized access to electronic protected health information that is being transmitted over an electronic communications network.',
  '164.312.e.2.I': 'Implement security measures to ensure that electronically transmitted electronic protected health information is not improperly modified without detection until disposed of.',
  '164.312.e.2.II': 'Implement a mechanism to encrypt electronic protected health information whenever deemed appropriate.'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJoaXBhYVJlcXVpcmVtZW50c0ZpbGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiaGlwYWEtcmVxdWlyZW1lbnRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBNb2R1bGUgZm9yIEhJUEFBIHJlcXVpcmVtZW50c1xuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBoaXBhYVJlcXVpcmVtZW50c0ZpbGUgPSB7XG4gICcxNjQuMzEyLmEuMSc6XG4gICAgJ0ltcGxlbWVudCB0ZWNobmljYWwgcG9saWNpZXMgYW5kIHByb2NlZHVyZXMgZm9yIGVsZWN0cm9uaWMgaW5mb3JtYXRpb24gc3lzdGVtcyB0aGF0IG1haW50YWluIGVsZWN0cm9uaWMgcHJvdGVjdGVkIGhlYWx0aCBpbmZvcm1hdGlvbiB0byBhbGxvdyBhY2Nlc3Mgb25seSB0byB0aG9zZSBwZXJzb25zIG9yIHNvZnR3YXJlIHByb2dyYW1zIHRoYXQgaGF2ZSBhY2Nlc3MuJyxcbiAgJzE2NC4zMTIuYS4yLkknOlxuICAgICdBc3NpZ24gYSB1bmlxdWUgbmFtZSBhbmQvb3IgbnVtYmVyIGZvciBpZGVudGlmeWluZyBhbmQgdHJhY2tpbmcgdXNlciBpZGVudGl0eS4nLFxuICAnMTY0LjMxMi5hLjIuSUknOlxuICAgICdFc3RhYmxpc2ggKGFuZCBpbXBsZW1lbnQgYXMgbmVlZGVkKSBwcm9jZWR1cmVzIGZvciBvYnRhaW5pbmcgbmVjZXNzYXJ5IGVsZWN0cm9uaWMgcHJvdGVjdGVkIGhlYWx0aCBpbmZvcm1hdGlvbiBkdXJpbmcgYW4gZW1lcmdlbmN5LicsXG4gICcxNjQuMzEyLmEuMi5JSUknOlxuICAgICdJbXBsZW1lbnQgZWxlY3Ryb25pYyBwcm9jZWR1cmVzIHRoYXQgdGVybWluYXRlIGFuIGVsZWN0cm9uaWMgc2Vzc2lvbiAgYWZ0ZXIgYSBwcmVkZXRlcm1pbmVkIHRpbWUgb2YgaW5hY3Rpdml0eS4nLFxuICAnMTY0LjMxMi5hLjIuSVYnOlxuICAgICdJbXBsZW1lbnQgYSBtZWNoYW5pc20gdG8gZW5jcnlwdCBhbmQgZGVjcnlwdCBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24uJyxcbiAgJzE2NC4zMTIuYic6XG4gICAgJ0ltcGxlbWVudCBoYXJkd2FyZSwgc29mdHdhcmUsIGFuZC9vciBwcm9jZWR1cmFsIG1lY2hhbmlzbXMgdGhhdCByZWNvcmQgYW5kIGV4YW1pbmUgYWN0aXZpdHkgaW4gaW5mb3JtYXRpb24gc3lzdGVtcyB0aGF0IGNvbnRhaW4gb3IgdXNlIGVsZWN0cm9uaWMgcHJvdGVjdGVkIGhlYWx0aCBpbmZvcm1hdGlvbi4nLFxuICAnMTY0LjMxMi5jLjEnOlxuICAgICdJbXBsZW1lbnQgcG9saWNpZXMgYW5kIHByb2NlZHVyZXMgdG8gcHJvdGVjdCBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gZnJvbSBpbXByb3BlciBhbHRlcmF0aW9uIG9yIGRlc3RydWN0aW9uLicsXG4gICcxNjQuMzEyLmMuMic6XG4gICAgJ0ltcGxlbWVudCBlbGVjdHJvbmljIG1lY2hhbmlzbXMgdG8gY29ycm9ib3JhdGUgdGhhdCBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gaGFzIG5vdCBiZWVuIGFsdGVyZWQgb3IgZGVzdHJveWVkIGluIGFuIHVuYXV0aG9yaXplZCBtYW5uZXIuJyxcbiAgJzE2NC4zMTIuZCc6XG4gICAgJ0ltcGxlbWVudCBwcm9jZWR1cmVzIHRvIHZlcmlmeSB0aGF0IGEgcGVyc29uIG9yIGVudGl0eSBzZWVraW5nIGFjY2VzcyB0byBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gaXMgdGhlIG9uZSBjbGFpbWVkLicsXG4gICcxNjQuMzEyLmUuMSc6XG4gICAgJ0ltcGxlbWVudCB0ZWNobmljYWwgc2VjdXJpdHkgbWVhc3VyZXMgdG8gZ3VhcmQgYWdhaW5zdCB1bmF1dGhvcml6ZWQgYWNjZXNzIHRvIGVsZWN0cm9uaWMgcHJvdGVjdGVkIGhlYWx0aCBpbmZvcm1hdGlvbiB0aGF0IGlzIGJlaW5nIHRyYW5zbWl0dGVkIG92ZXIgYW4gZWxlY3Ryb25pYyBjb21tdW5pY2F0aW9ucyBuZXR3b3JrLicsXG4gICcxNjQuMzEyLmUuMi5JJzpcbiAgICAnSW1wbGVtZW50IHNlY3VyaXR5IG1lYXN1cmVzIHRvIGVuc3VyZSB0aGF0IGVsZWN0cm9uaWNhbGx5IHRyYW5zbWl0dGVkIGVsZWN0cm9uaWMgcHJvdGVjdGVkIGhlYWx0aCBpbmZvcm1hdGlvbiBpcyBub3QgaW1wcm9wZXJseSBtb2RpZmllZCB3aXRob3V0IGRldGVjdGlvbiB1bnRpbCBkaXNwb3NlZCBvZi4nLFxuICAnMTY0LjMxMi5lLjIuSUknOlxuICAgICdJbXBsZW1lbnQgYSBtZWNoYW5pc20gdG8gZW5jcnlwdCBlbGVjdHJvbmljIHByb3RlY3RlZCBoZWFsdGggaW5mb3JtYXRpb24gd2hlbmV2ZXIgZGVlbWVkIGFwcHJvcHJpYXRlLidcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxxQkFBcUIsR0FBQUMsT0FBQSxDQUFBRCxxQkFBQSxHQUFHO0VBQ25DLGFBQWEsRUFDWCxtTkFBbU47RUFDck4sZUFBZSxFQUNiLGdGQUFnRjtFQUNsRixnQkFBZ0IsRUFDZCxxSUFBcUk7RUFDdkksaUJBQWlCLEVBQ2YsaUhBQWlIO0VBQ25ILGdCQUFnQixFQUNkLHVGQUF1RjtFQUN6RixXQUFXLEVBQ1QsaUxBQWlMO0VBQ25MLGFBQWEsRUFDWCwrSEFBK0g7RUFDakksYUFBYSxFQUNYLDBKQUEwSjtFQUM1SixXQUFXLEVBQ1Qsc0lBQXNJO0VBQ3hJLGFBQWEsRUFDWCw0TEFBNEw7RUFDOUwsZUFBZSxFQUNiLCtLQUErSztFQUNqTCxnQkFBZ0IsRUFDZDtBQUNKLENBQUMifQ==