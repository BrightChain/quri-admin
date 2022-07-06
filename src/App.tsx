import * as React from "react";
import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";
import { environment } from "./quri/src/environments/environment";
import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "@firebase/app-check";
import { firebaseAppCheckConfig } from "./quri/src/firebaseAppCheckConfig";
import { ConfigurationHelper } from "./quri/src/configurationHelper";

// import * as admin from 'firebase-admin';
// import * as fireorm from 'fireorm';

// import { environment } from './quri/src/environments/environment';

// const serviceAccount = require('./firestore.creds.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: environment.firebase.databaseURL,
// });

// const firestore = admin.firestore();
// fireorm.initialize(firestore);

const config: FirebaseOptions = environment.firebase;

const options: RAFirebaseOptions = {
  logging: true,
  rootRef: "/",
  watch: ["posts"],
};
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = !environment.production;
const firebaseApp: FirebaseApp = ConfigurationHelper.EnsureApp(
  environment.firebase
);

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(firebaseAppCheckConfig.siteKey),
  isTokenAutoRefreshEnabled: true,
});
class App extends React.Component {
  render() {
    return (
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource
          name="posts"
          list={PostList}
          show={PostShow}
          create={PostCreate}
          edit={PostEdit}
        />
      </Admin>
    );
  }
}

export default App;
