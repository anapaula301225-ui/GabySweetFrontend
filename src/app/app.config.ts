import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';


import {
  provideRouter
} from '@angular/router';


import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';


import {
  authInterceptor
} from './interceptors/auth.interceptor';


import {
  routes
} from './app.routes';



import {
  provideFirebaseApp,
  initializeApp
} from '@angular/fire/app';


import {
  provideMessaging,
  getMessaging
} from '@angular/fire/messaging';


import {
  environment
} from '../environments/environment';





export const appConfig: ApplicationConfig = {


providers:[


provideBrowserGlobalErrorListeners(),



provideZoneChangeDetection({

eventCoalescing:true

}),



provideRouter(routes),



provideHttpClient(

withInterceptors([

authInterceptor

])

),




// ==========================
// FIREBASE
// ==========================

provideFirebaseApp(()=>


initializeApp(

environment.firebase

)

),



provideMessaging(()=>


getMessaging()

)



]


};