// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://notiz.dev',
  api: 'https://api.notiz.dev',
  title: 'notiz',
  description:
    'Weeklyish articles about Angular, Nestjs, Web Components, and more things related to web development.',
  featureImage: 'assets/img/featured.png',
  keywords: [
    'notiz',
    'notiz.dev',
    'Angular',
    'Nestjs',
    'Web Components',
    'Scully',
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
