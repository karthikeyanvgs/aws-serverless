// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  identityServiceUrl: 'https://login-dev.awsdsi.ghx.com/identity-service/authorize',
  client_id: 'CA8A4AA96549F29796EA370DD93416EC4EE7B135',
  idpRedirectUri: 'http://192.168.3.52:4200/',
  serviceBaseUrl: 'https://wbjvoqr680.execute-api.us-west-2.amazonaws.com/dev/clincx/v1/'
};
