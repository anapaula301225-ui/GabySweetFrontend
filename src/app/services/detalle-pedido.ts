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
export class DetallePedidoService {

  private http = inject(HttpClient);

  private api = environment.apiUrl;

  private getHeaders(){

    const token = localStorage.getItem('token');

    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`

      })

    };

  }

  // ===========================
  // AGREGAR PRODUCTO AL PEDIDO
  // ===========================

  agregarProducto(

    idPedido:number,

    datos:any

  ):Observable<any>{

    return this.http.post(

      `${this.api}/pedidos/${idPedido}/productos`,

      datos,

      this.getHeaders()

    );

  }

  // ===========================
  // OBTENER DETALLE
  // ===========================

  obtenerDetalle(idPedido:number):Observable<any>{

    return this.http.get(

      `${this.api}/pedidos/${idPedido}/detalle`,

      this.getHeaders()

    );

  }

}