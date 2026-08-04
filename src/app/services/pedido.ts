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
export class PedidoService {


  private http = inject(HttpClient);


  private api = `${environment.apiUrl}/pedidos`;



  constructor(){}



  // ==========================
  // HEADERS CON JWT
  // ==========================

  private getHeaders(){


    const token = localStorage.getItem('token');


    return {


      headers: new HttpHeaders({


        Authorization: `Bearer ${token}`


      })


    };


  }





  // ==========================
  // REGISTRAR PEDIDO
  // ==========================

  registrar(datos:any): Observable<any>{


    return this.http.post(


      this.api,


      datos,


      this.getHeaders()


    );


  }






  // ==========================
  // LISTAR PEDIDOS
  // ==========================

  listar(): Observable<any>{


    return this.http.get(


      this.api,


      this.getHeaders()


    );


  }







  // ==========================
  // OBTENER PEDIDO
  // ==========================

  obtener(id:number): Observable<any>{


    return this.http.get(


      `${this.api}/${id}`,


      this.getHeaders()


    );


  }







  // ==========================
  // OBTENER DETALLE DEL PEDIDO
  // ==========================

  obtenerDetalle(id:number): Observable<any>{


    return this.http.get(


      `${this.api}/${id}/detalle`,


      this.getHeaders()


    );


  }







  // ==========================
  // ACTUALIZAR PEDIDO
  // ==========================

  actualizar(id:number, datos:any): Observable<any>{


    return this.http.put(


      `${this.api}/${id}`,


      datos,


      this.getHeaders()


    );


  }







  // ==========================
  // CANCELAR PEDIDO
  // ==========================

  cancelar(id:number): Observable<any>{


    return this.http.delete(


      `${this.api}/${id}`,


      this.getHeaders()


    );


  }



}