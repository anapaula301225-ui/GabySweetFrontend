import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private http = inject(HttpClient);


  private api =
  `${environment.apiUrl}/dashboard`;





  // ==========================
  // HEADERS JWT
  // ==========================

  private getHeaders(){


    const token =
    localStorage.getItem('token');



    if(!token){

      console.error(
        "No existe token en localStorage"
      );

    }



    return {


      headers: new HttpHeaders({

        Authorization:
        `Bearer ${token}`

      })


    };


  }






  // ==========================
  // OBTENER RESUMEN DASHBOARD
  // ==========================

  obtenerResumen(): Observable<any>{



    return this.http.get(


      this.api,


      this.getHeaders()


    );


  }





}