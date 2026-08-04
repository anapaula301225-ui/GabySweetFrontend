import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


import {
  Usuario
} from '../models/usuario';


import {
  environment
} from '../../environments/environment';



@Injectable({
  providedIn:'root'
})


export class AuthService {



  private http = inject(HttpClient);


  private api =
  environment.apiUrl;





  constructor(){}







  // =====================================
  // REGISTRAR USUARIO
  // =====================================


  registrar(
    usuario:Usuario
  ):Observable<any>{


    return this.http.post(

      `${this.api}/usuarios/registrar`,

      usuario

    );


  }









  // =====================================
  // LOGIN NORMAL
  // =====================================


  login(

    email:string,

    password:string

  ):Observable<any>{


    return this.http.post(

      `${this.api}/usuarios/login`,

      {

        email,

        password

      }

    );


  }









  // =====================================
  // LOGIN CON GOOGLE
  // =====================================


  loginGoogle(

    token:string

  ):Observable<any>{



    return this.http.post(

      `${this.api}/auth/google`,

      {

        token

      }

    );


  }









  // =====================================
  // OBTENER PERFIL
  // =====================================


  obtenerPerfil():Observable<any>{



    const token =
    localStorage.getItem('token');



    const headers =
    new HttpHeaders({

      Authorization:
      `Bearer ${token}`

    });



    return this.http.get(

      `${this.api}/usuarios/perfil`,

      {

        headers

      }

    );


  }









  // =====================================
  // ACTUALIZAR PERFIL
  // =====================================


  actualizarPerfil(

    usuario:any

  ):Observable<any>{



    const token =
    localStorage.getItem('token');



    const headers =
    new HttpHeaders({

      Authorization:
      `Bearer ${token}`

    });



    return this.http.put(

      `${this.api}/usuarios/perfil`,

      usuario,

      {

        headers

      }

    );


  }









  // =====================================
  // CERRAR SESIÓN
  // =====================================


  logout(){



    localStorage.removeItem(
      'token'
    );


    localStorage.removeItem(
      'usuario'
    );


  }









  // =====================================
  // USUARIO ACTUAL
  // =====================================


  obtenerUsuarioActual(){



    const usuario =
    localStorage.getItem(
      'usuario'
    );



    if(usuario){


      return JSON.parse(usuario);


    }



    return null;


  }


  // =====================================
  // GUARDAR TOKEN FIREBASE
  // =====================================

  guardarTokenFirebase(
    firebase_token:string
  ):Observable<any>{


    return this.http.put(

      `${this.api}/usuarios/firebase-token`,

      {

        firebase_token

      }

    );


  }

}