import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn:'root'
})
export class AuditoriaService {


  private http = inject(HttpClient);


  private api = `${environment.apiUrl}/auditoria`;




  private getHeaders(){


    const token = localStorage.getItem('token');


    return {

      headers:new HttpHeaders({

        Authorization:`Bearer ${token}`

      })

    };


  }





  // ==========================
  // LISTAR AUDITORIA
  // ==========================

  listar():Observable<any>{


    return this.http.get(

      this.api,

      this.getHeaders()

    );


  }



}