import * as React from "react";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";
import { environment } from "./quri/src/environments/environment";
import { FirebaseApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "@firebase/app-check";
import { firebaseAppCheckConfig } from "./quri/src/firebaseAppCheckConfig";
import { ConfigurationHelper } from "./quri/src/configurationHelper";
import { IDataProvider } from "react-admin-firebase/dist/providers/DataProvider";
import { ReactAdminFirebaseAuthProvider } from "react-admin-firebase/dist/providers/AuthProvider";

export class AppCheckApp<
  P = unknown,
  S = unknown,
  SS = any
> extends React.Component<P, S, SS> {
  protected dataProvider: IDataProvider;
  protected authProvider: ReactAdminFirebaseAuthProvider;
  protected appCheck: AppCheck | null;
  protected options: RAFirebaseOptions;

  constructor(options: RAFirebaseOptions, props: Readonly<P> | P) {
    super(props);
    this.dataProvider = FirebaseDataProvider(environment.firebase, options);
    this.authProvider = FirebaseAuthProvider(environment.firebase, options);
    this.options = options;

    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = !environment.production;
    const firebaseApp: FirebaseApp = ConfigurationHelper.EnsureApp(
      environment.firebase
    );

    if (
      firebaseAppCheckConfig.siteKey !== undefined &&
      firebaseAppCheckConfig.siteKey !== null &&
      firebaseAppCheckConfig.siteKey.trim().length > 0
    ) {
      this.appCheck = initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(
          firebaseAppCheckConfig.siteKey.trim()
        ),
        isTokenAutoRefreshEnabled: true,
      });
    } else {
      this.appCheck = null;
    }
  }
}

export default AppCheckApp;
