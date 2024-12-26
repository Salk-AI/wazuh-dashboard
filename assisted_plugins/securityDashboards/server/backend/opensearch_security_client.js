"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityClient = void 0;
/*
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

class SecurityClient {
  constructor(esClient) {
    this.esClient = esClient;
  }
  async authenticate(request, credentials) {
    const authHeader = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
    try {
      const esResponse = await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.authinfo', {
        headers: {
          authorization: `Basic ${authHeader}`
        }
      });
      return {
        username: credentials.username,
        roles: esResponse.roles,
        backendRoles: esResponse.backend_roles,
        tenants: esResponse.tenants,
        selectedTenant: esResponse.user_requested_tenant,
        credentials,
        proxyCredentials: credentials,
        tenancy_configs: esResponse.tenancy_configs
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async authenticateWithHeader(request, headerName, headerValue, whitelistedHeadersAndValues = {}, additionalAuthHeaders = {}) {
    try {
      const credentials = {
        headerName,
        headerValue
      };
      const headers = {};
      if (headerValue) {
        headers[headerName] = headerValue;
      }

      // cannot get config elasticsearch.requestHeadersWhitelist from kibana.yml file in new platfrom
      // meanwhile, do we really need to save all headers in cookie?
      const esResponse = await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.authinfo', {
        headers
      });
      return {
        username: esResponse.user_name,
        roles: esResponse.roles,
        backendRoles: esResponse.backend_roles,
        tenants: esResponse.tenants,
        selectedTenant: esResponse.user_requested_tenant,
        credentials
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async authenticateWithHeaders(request, additionalAuthHeaders = {}) {
    try {
      const esResponse = await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.authinfo', {
        headers: additionalAuthHeaders
      });
      return {
        username: esResponse.user_name,
        roles: esResponse.roles,
        backendRoles: esResponse.backend_roles,
        tenants: esResponse.tenants,
        selectedTenant: esResponse.user_requested_tenant
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async authinfo(request, headers = {}) {
    try {
      return await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.authinfo', {
        headers
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async dashboardsinfo(request, headers = {}) {
    try {
      return await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.dashboardsinfo', {
        headers
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Multi-tenancy APIs
  async getMultitenancyInfo(request) {
    try {
      return await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.multitenancyinfo');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async putMultitenancyConfigurations(request, tenancyConfigSettings) {
    const body = {
      multitenancy_enabled: tenancyConfigSettings.multitenancy_enabled,
      private_tenant_enabled: tenancyConfigSettings.private_tenant_enabled,
      default_tenant: tenancyConfigSettings.default_tenant
    };
    try {
      return await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.tenancy_configs', {
        body
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getTenantInfoWithInternalUser() {
    try {
      return this.esClient.callAsInternalUser('opensearch_security.tenantinfo');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getTenantInfo(request) {
    try {
      return await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.tenantinfo');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getSamlHeader(request) {
    try {
      // response is expected to be an error
      await this.esClient.asScoped(request).callAsCurrentUser('opensearch_security.authinfo');
    } catch (error) {
      // the error looks like
      // wwwAuthenticateDirective:
      //   '
      //     X-Security-IdP realm="Open Distro Security"
      //     location="https://<your-auth-domain.com>/api/saml2/v1/sso?SAMLRequest=<some-encoded-string>"
      //     requestId="<request_id>"
      //   '

      if (!error.wwwAuthenticateDirective) {
        throw error;
      }
      try {
        const locationRegExp = /location="(.*?)"/;
        const requestIdRegExp = /requestId="(.*?)"/;
        const locationExecArray = locationRegExp.exec(error.wwwAuthenticateDirective);
        const requestExecArray = requestIdRegExp.exec(error.wwwAuthenticateDirective);
        if (locationExecArray && requestExecArray) {
          return {
            location: locationExecArray[1],
            requestId: requestExecArray[1]
          };
        }
        throw Error('failed parsing SAML config');
      } catch (parsingError) {
        console.log(parsingError);
        throw new Error(parsingError);
      }
    }
    throw new Error(`Invalid SAML configuration.`);
  }
  async authToken(requestId, samlResponse, acsEndpoint = undefined) {
    const body = {
      RequestId: requestId,
      SAMLResponse: samlResponse,
      acsEndpoint
    };
    try {
      return await this.esClient.asScoped().callAsCurrentUser('opensearch_security.authtoken', {
        body
      });
    } catch (error) {
      console.log(error);
      throw new Error('failed to get token');
    }
  }
}
exports.SecurityClient = SecurityClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTZWN1cml0eUNsaWVudCIsImNvbnN0cnVjdG9yIiwiZXNDbGllbnQiLCJhdXRoZW50aWNhdGUiLCJyZXF1ZXN0IiwiY3JlZGVudGlhbHMiLCJhdXRoSGVhZGVyIiwiQnVmZmVyIiwiZnJvbSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ0b1N0cmluZyIsImVzUmVzcG9uc2UiLCJhc1Njb3BlZCIsImNhbGxBc0N1cnJlbnRVc2VyIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJyb2xlcyIsImJhY2tlbmRSb2xlcyIsImJhY2tlbmRfcm9sZXMiLCJ0ZW5hbnRzIiwic2VsZWN0ZWRUZW5hbnQiLCJ1c2VyX3JlcXVlc3RlZF90ZW5hbnQiLCJwcm94eUNyZWRlbnRpYWxzIiwidGVuYW5jeV9jb25maWdzIiwiZXJyb3IiLCJFcnJvciIsIm1lc3NhZ2UiLCJhdXRoZW50aWNhdGVXaXRoSGVhZGVyIiwiaGVhZGVyTmFtZSIsImhlYWRlclZhbHVlIiwid2hpdGVsaXN0ZWRIZWFkZXJzQW5kVmFsdWVzIiwiYWRkaXRpb25hbEF1dGhIZWFkZXJzIiwidXNlcl9uYW1lIiwiYXV0aGVudGljYXRlV2l0aEhlYWRlcnMiLCJhdXRoaW5mbyIsImRhc2hib2FyZHNpbmZvIiwiZ2V0TXVsdGl0ZW5hbmN5SW5mbyIsInB1dE11bHRpdGVuYW5jeUNvbmZpZ3VyYXRpb25zIiwidGVuYW5jeUNvbmZpZ1NldHRpbmdzIiwiYm9keSIsIm11bHRpdGVuYW5jeV9lbmFibGVkIiwicHJpdmF0ZV90ZW5hbnRfZW5hYmxlZCIsImRlZmF1bHRfdGVuYW50IiwiZ2V0VGVuYW50SW5mb1dpdGhJbnRlcm5hbFVzZXIiLCJjYWxsQXNJbnRlcm5hbFVzZXIiLCJnZXRUZW5hbnRJbmZvIiwiZ2V0U2FtbEhlYWRlciIsInd3d0F1dGhlbnRpY2F0ZURpcmVjdGl2ZSIsImxvY2F0aW9uUmVnRXhwIiwicmVxdWVzdElkUmVnRXhwIiwibG9jYXRpb25FeGVjQXJyYXkiLCJleGVjIiwicmVxdWVzdEV4ZWNBcnJheSIsImxvY2F0aW9uIiwicmVxdWVzdElkIiwicGFyc2luZ0Vycm9yIiwiY29uc29sZSIsImxvZyIsImF1dGhUb2tlbiIsInNhbWxSZXNwb25zZSIsImFjc0VuZHBvaW50IiwidW5kZWZpbmVkIiwiUmVxdWVzdElkIiwiU0FNTFJlc3BvbnNlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIm9wZW5zZWFyY2hfc2VjdXJpdHlfY2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgSUxlZ2FjeUNsdXN0ZXJDbGllbnQsIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vYXV0aC91c2VyJztcbmltcG9ydCB7IGdldEF1dGhJbmZvIH0gZnJvbSAnLi4vLi4vcHVibGljL3V0aWxzL2F1dGgtaW5mby11dGlscyc7XG5pbXBvcnQgeyBUZW5hbmN5Q29uZmlnU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9wdWJsaWMvYXBwcy9jb25maWd1cmF0aW9uL3BhbmVscy90ZW5hbmN5LWNvbmZpZy90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBTZWN1cml0eUNsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZXNDbGllbnQ6IElMZWdhY3lDbHVzdGVyQ2xpZW50KSB7fVxuXG4gIHB1YmxpYyBhc3luYyBhdXRoZW50aWNhdGUocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LCBjcmVkZW50aWFsczogYW55KTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgYXV0aEhlYWRlciA9IEJ1ZmZlci5mcm9tKGAke2NyZWRlbnRpYWxzLnVzZXJuYW1lfToke2NyZWRlbnRpYWxzLnBhc3N3b3JkfWApLnRvU3RyaW5nKFxuICAgICAgJ2Jhc2U2NCdcbiAgICApO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBlc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5lc0NsaWVudFxuICAgICAgICAuYXNTY29wZWQocmVxdWVzdClcbiAgICAgICAgLmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmF1dGhpbmZvJywge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGBCYXNpYyAke2F1dGhIZWFkZXJ9YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVzZXJuYW1lOiBjcmVkZW50aWFscy51c2VybmFtZSxcbiAgICAgICAgcm9sZXM6IGVzUmVzcG9uc2Uucm9sZXMsXG4gICAgICAgIGJhY2tlbmRSb2xlczogZXNSZXNwb25zZS5iYWNrZW5kX3JvbGVzLFxuICAgICAgICB0ZW5hbnRzOiBlc1Jlc3BvbnNlLnRlbmFudHMsXG4gICAgICAgIHNlbGVjdGVkVGVuYW50OiBlc1Jlc3BvbnNlLnVzZXJfcmVxdWVzdGVkX3RlbmFudCxcbiAgICAgICAgY3JlZGVudGlhbHMsXG4gICAgICAgIHByb3h5Q3JlZGVudGlhbHM6IGNyZWRlbnRpYWxzLFxuICAgICAgICB0ZW5hbmN5X2NvbmZpZ3M6IGVzUmVzcG9uc2UudGVuYW5jeV9jb25maWdzLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGF1dGhlbnRpY2F0ZVdpdGhIZWFkZXIoXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIGhlYWRlck5hbWU6IHN0cmluZyxcbiAgICBoZWFkZXJWYWx1ZTogc3RyaW5nLFxuICAgIHdoaXRlbGlzdGVkSGVhZGVyc0FuZFZhbHVlczogYW55ID0ge30sXG4gICAgYWRkaXRpb25hbEF1dGhIZWFkZXJzOiBhbnkgPSB7fVxuICApOiBQcm9taXNlPFVzZXI+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY3JlZGVudGlhbHM6IGFueSA9IHtcbiAgICAgICAgaGVhZGVyTmFtZSxcbiAgICAgICAgaGVhZGVyVmFsdWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgaGVhZGVyczogYW55ID0ge307XG4gICAgICBpZiAoaGVhZGVyVmFsdWUpIHtcbiAgICAgICAgaGVhZGVyc1toZWFkZXJOYW1lXSA9IGhlYWRlclZhbHVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjYW5ub3QgZ2V0IGNvbmZpZyBlbGFzdGljc2VhcmNoLnJlcXVlc3RIZWFkZXJzV2hpdGVsaXN0IGZyb20ga2liYW5hLnltbCBmaWxlIGluIG5ldyBwbGF0ZnJvbVxuICAgICAgLy8gbWVhbndoaWxlLCBkbyB3ZSByZWFsbHkgbmVlZCB0byBzYXZlIGFsbCBoZWFkZXJzIGluIGNvb2tpZT9cbiAgICAgIGNvbnN0IGVzUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmVzQ2xpZW50XG4gICAgICAgIC5hc1Njb3BlZChyZXF1ZXN0KVxuICAgICAgICAuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuYXV0aGluZm8nLCB7XG4gICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VybmFtZTogZXNSZXNwb25zZS51c2VyX25hbWUsXG4gICAgICAgIHJvbGVzOiBlc1Jlc3BvbnNlLnJvbGVzLFxuICAgICAgICBiYWNrZW5kUm9sZXM6IGVzUmVzcG9uc2UuYmFja2VuZF9yb2xlcyxcbiAgICAgICAgdGVuYW50czogZXNSZXNwb25zZS50ZW5hbnRzLFxuICAgICAgICBzZWxlY3RlZFRlbmFudDogZXNSZXNwb25zZS51c2VyX3JlcXVlc3RlZF90ZW5hbnQsXG4gICAgICAgIGNyZWRlbnRpYWxzLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGF1dGhlbnRpY2F0ZVdpdGhIZWFkZXJzKFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICBhZGRpdGlvbmFsQXV0aEhlYWRlcnM6IGFueSA9IHt9XG4gICk6IFByb21pc2U8VXNlcj4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBlc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5lc0NsaWVudFxuICAgICAgICAuYXNTY29wZWQocmVxdWVzdClcbiAgICAgICAgLmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmF1dGhpbmZvJywge1xuICAgICAgICAgIGhlYWRlcnM6IGFkZGl0aW9uYWxBdXRoSGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VybmFtZTogZXNSZXNwb25zZS51c2VyX25hbWUsXG4gICAgICAgIHJvbGVzOiBlc1Jlc3BvbnNlLnJvbGVzLFxuICAgICAgICBiYWNrZW5kUm9sZXM6IGVzUmVzcG9uc2UuYmFja2VuZF9yb2xlcyxcbiAgICAgICAgdGVuYW50czogZXNSZXNwb25zZS50ZW5hbnRzLFxuICAgICAgICBzZWxlY3RlZFRlbmFudDogZXNSZXNwb25zZS51c2VyX3JlcXVlc3RlZF90ZW5hbnQsXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXV0aGluZm8ocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LCBoZWFkZXJzOiBhbnkgPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5lc0NsaWVudFxuICAgICAgICAuYXNTY29wZWQocmVxdWVzdClcbiAgICAgICAgLmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmF1dGhpbmZvJywge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGFzaGJvYXJkc2luZm8ocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LCBoZWFkZXJzOiBhbnkgPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5lc0NsaWVudFxuICAgICAgICAuYXNTY29wZWQocmVxdWVzdClcbiAgICAgICAgLmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmRhc2hib2FyZHNpbmZvJywge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICAvLyBNdWx0aS10ZW5hbmN5IEFQSXNcbiAgcHVibGljIGFzeW5jIGdldE11bHRpdGVuYW5jeUluZm8ocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmVzQ2xpZW50XG4gICAgICAgIC5hc1Njb3BlZChyZXF1ZXN0KVxuICAgICAgICAuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkubXVsdGl0ZW5hbmN5aW5mbycpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHV0TXVsdGl0ZW5hbmN5Q29uZmlndXJhdGlvbnMoXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHRlbmFuY3lDb25maWdTZXR0aW5nczogVGVuYW5jeUNvbmZpZ1NldHRpbmdzXG4gICkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBtdWx0aXRlbmFuY3lfZW5hYmxlZDogdGVuYW5jeUNvbmZpZ1NldHRpbmdzLm11bHRpdGVuYW5jeV9lbmFibGVkLFxuICAgICAgcHJpdmF0ZV90ZW5hbnRfZW5hYmxlZDogdGVuYW5jeUNvbmZpZ1NldHRpbmdzLnByaXZhdGVfdGVuYW50X2VuYWJsZWQsXG4gICAgICBkZWZhdWx0X3RlbmFudDogdGVuYW5jeUNvbmZpZ1NldHRpbmdzLmRlZmF1bHRfdGVuYW50LFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmVzQ2xpZW50XG4gICAgICAgIC5hc1Njb3BlZChyZXF1ZXN0KVxuICAgICAgICAuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkudGVuYW5jeV9jb25maWdzJywge1xuICAgICAgICAgIGJvZHksXG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VGVuYW50SW5mb1dpdGhJbnRlcm5hbFVzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmVzQ2xpZW50LmNhbGxBc0ludGVybmFsVXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS50ZW5hbnRpbmZvJyk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRUZW5hbnRJbmZvKHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5lc0NsaWVudFxuICAgICAgICAuYXNTY29wZWQocmVxdWVzdClcbiAgICAgICAgLmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LnRlbmFudGluZm8nKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFNhbWxIZWFkZXIocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIHJlc3BvbnNlIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGVycm9yXG4gICAgICBhd2FpdCB0aGlzLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpLmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LmF1dGhpbmZvJyk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gdGhlIGVycm9yIGxvb2tzIGxpa2VcbiAgICAgIC8vIHd3d0F1dGhlbnRpY2F0ZURpcmVjdGl2ZTpcbiAgICAgIC8vICAgJ1xuICAgICAgLy8gICAgIFgtU2VjdXJpdHktSWRQIHJlYWxtPVwiT3BlbiBEaXN0cm8gU2VjdXJpdHlcIlxuICAgICAgLy8gICAgIGxvY2F0aW9uPVwiaHR0cHM6Ly88eW91ci1hdXRoLWRvbWFpbi5jb20+L2FwaS9zYW1sMi92MS9zc28/U0FNTFJlcXVlc3Q9PHNvbWUtZW5jb2RlZC1zdHJpbmc+XCJcbiAgICAgIC8vICAgICByZXF1ZXN0SWQ9XCI8cmVxdWVzdF9pZD5cIlxuICAgICAgLy8gICAnXG5cbiAgICAgIGlmICghZXJyb3Iud3d3QXV0aGVudGljYXRlRGlyZWN0aXZlKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBsb2NhdGlvblJlZ0V4cCA9IC9sb2NhdGlvbj1cIiguKj8pXCIvO1xuICAgICAgICBjb25zdCByZXF1ZXN0SWRSZWdFeHAgPSAvcmVxdWVzdElkPVwiKC4qPylcIi87XG5cbiAgICAgICAgY29uc3QgbG9jYXRpb25FeGVjQXJyYXkgPSBsb2NhdGlvblJlZ0V4cC5leGVjKGVycm9yLnd3d0F1dGhlbnRpY2F0ZURpcmVjdGl2ZSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RFeGVjQXJyYXkgPSByZXF1ZXN0SWRSZWdFeHAuZXhlYyhlcnJvci53d3dBdXRoZW50aWNhdGVEaXJlY3RpdmUpO1xuICAgICAgICBpZiAobG9jYXRpb25FeGVjQXJyYXkgJiYgcmVxdWVzdEV4ZWNBcnJheSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25FeGVjQXJyYXlbMV0sXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RFeGVjQXJyYXlbMV0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBFcnJvcignZmFpbGVkIHBhcnNpbmcgU0FNTCBjb25maWcnKTtcbiAgICAgIH0gY2F0Y2ggKHBhcnNpbmdFcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnNpbmdFcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihwYXJzaW5nRXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgU0FNTCBjb25maWd1cmF0aW9uLmApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGF1dGhUb2tlbihcbiAgICByZXF1ZXN0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBzYW1sUmVzcG9uc2U6IGFueSxcbiAgICBhY3NFbmRwb2ludDogYW55IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gICkge1xuICAgIGNvbnN0IGJvZHkgPSB7XG4gICAgICBSZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcbiAgICAgIFNBTUxSZXNwb25zZTogc2FtbFJlc3BvbnNlLFxuICAgICAgYWNzRW5kcG9pbnQsXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZXNDbGllbnQuYXNTY29wZWQoKS5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5hdXRodG9rZW4nLCB7XG4gICAgICAgIGJvZHksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBnZXQgdG9rZW4nKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFPTyxNQUFNQSxjQUFjLENBQUM7RUFDMUJDLFdBQVdBLENBQWtCQyxR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