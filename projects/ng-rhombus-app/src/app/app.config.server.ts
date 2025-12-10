import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, connectFirestoreEmulator, Firestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => {
      const fs: Firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(fs, '127.0.0.1', 8080);
      }
      return fs;
    }),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
