import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, Firestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { Auth, connectAuthEmulator, provideAuth } from '@angular/fire/auth';
import { initializeAuth, indexedDBLocalPersistence, inMemoryPersistence } from 'firebase/auth';
import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { connectStorageEmulator, getStorage, provideStorage, Storage } from '@angular/fire/storage';
import { provideMarkdown } from 'ngx-markdown';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    provideAuth(() => {
      const platformId = inject(PLATFORM_ID);
      const auth: Auth = initializeAuth(getApp(), {
        persistence: isPlatformServer(platformId)
          ? inMemoryPersistence
          : indexedDBLocalPersistence
      });
      if (!environment.production) {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore: Firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
      return firestore;
    }),
    provideStorage(() => {
      const storage: Storage = getStorage();
      if (!environment.production) {
        connectStorageEmulator(storage, '127.0.0.1', 9199);
      }
      return storage;
    }),
    provideMarkdown(), provideClientHydration(withEventReplay())
  ]
};
