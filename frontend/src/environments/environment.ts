// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import config from '../../auth_config.json';

const { domain, clientId, authorizationParams: { audience, redirect_uri, scope }, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience?: string;
    redirect_uri?: string;
    scope?: string;
  },
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
      redirect_uri: window.location.origin,
      scope
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [
      {
        // Match any request that starts 'https://dev-8myc5qwlpx43fwh5.us.auth0.com/api/v2/' (note the asterisk)
        uri: 'http://localhost:8080/api/*',
        tokenOptions: {
          authorizationParams: {
            // The attached token should target this audience
            audience,

            // The attached token should have these scopes
            scope: 'read:demo'
          }
        }
      }
    ]
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
