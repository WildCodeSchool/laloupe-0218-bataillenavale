// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDK7BK7sxf6lFImnX_RrTmnDg1Dze2q3aM",
    authDomain: "navy-battle.firebaseapp.com",
    databaseURL: "https://navy-battle.firebaseio.com",
    projectId: "navy-battle",
    storageBucket: "navy-battle.appspot.com",
    messagingSenderId: "275003127901"
  }
};
