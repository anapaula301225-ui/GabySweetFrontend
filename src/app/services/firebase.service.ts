import {
  Injectable,
  inject,
  Injector,
  runInInjectionContext
} from '@angular/core';

import {
  Messaging,
  getToken,
  onMessage
} from '@angular/fire/messaging';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  private messaging = inject(Messaging);

  private injector = inject(Injector);



  obtenerToken(){


    return runInInjectionContext(

      this.injector,

      async () => {


        try {


          const token = await getToken(

            this.messaging,

            {

              vapidKey:
              'BLVshVNOJFEmLEFWoW47nakFM4tjYx1BgmlQKO2yClvL506oh1k06-g5S2lzRlo-HMZTd5A1klWs6WU1pm4Vb90'

            }

          );


          console.log(
            'TOKEN FIREBASE:',
            token
          );


          return token;


        } catch(error){


          console.error(
            'Error obteniendo token Firebase',
            error
          );


          return null;

        }


      }

    );


  }





  escucharMensajes(){


    runInInjectionContext(

      this.injector,

      () => {


        onMessage(

          this.messaging,

          payload => {


            console.log(
              'Mensaje recibido:',
              payload
            );


          }

        );


      }

    );


  }


}