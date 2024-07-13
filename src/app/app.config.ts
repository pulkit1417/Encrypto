import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"key-manager-15635","appId":"1:29038001773:web:472ced673825bc5f208964","storageBucket":"key-manager-15635.appspot.com","apiKey":"AIzaSyATQsqC2aIcUI8Mq4aXAi0wzhjXasxJHK0","authDomain":"key-manager-15635.firebaseapp.com","messagingSenderId":"29038001773"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
