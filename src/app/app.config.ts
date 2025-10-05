import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebaseConfig);
      console.log('✅ Firebase wurde initialisiert:', app.name);
      return app;
    }),

    provideFirestore(() => getFirestore()),]
};
