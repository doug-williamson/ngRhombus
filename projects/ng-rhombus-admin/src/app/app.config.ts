import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, Firestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { Auth, connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideMarkdown } from 'ngx-markdown';

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
      const auth: Auth = getAuth();
      if (!environment.production) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: false });
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore: Firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideStorage(() => getStorage()),
    provideMarkdown()
  ]
};
