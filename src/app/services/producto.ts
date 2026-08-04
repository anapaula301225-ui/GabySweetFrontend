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
export class ProductoService {


  private http = inject(HttpClient);


  private api = `${environment.apiUrl}/productos`;



  constructor() { }




  // ==========================
  // HEADERS CON JWT
  // ==========================

  private getHeaders() {


    const token = localStorage.getItem('token');


    return {


      headers: new HttpHeaders({


        Authorization: `Bearer ${token}`


      })


    };


  }






  // ==========================
  // LISTAR PRODUCTOS
  // ==========================

  listar(): Observable<any> {


    return this.http.get(

      this.api

    );


  }


  // ==========================
// LISTAR PRODUCTOS DISPONIBLES CLIENTE
// ==========================

listarDisponibles(): Observable<any> {


  return this.http.get(

    `${this.api}/tienda`

  );


}




  // ==========================
  // OBTENER PRODUCTO
  // ==========================

  obtener(id: number): Observable<any> {


    return this.http.get(

      `${this.api}/${id}`

    );


  }







  // ==========================
  // BUSCAR PRODUCTO
  // ==========================

  buscar(nombre: string): Observable<any> {


    return this.http.get(

      `${this.api}/buscar?nombre=${nombre}`

    );


  }







  // ==========================
  // REGISTRAR PRODUCTO CON IMAGEN
  // ==========================

  registrar(formData: FormData): Observable<any> {


    return this.http.post(

      this.api,

      formData,

      this.getHeaders()

    );


  }







  // ==========================
  // ACTUALIZAR PRODUCTO CON IMAGEN
  // ==========================

  actualizar(
    id: number,
    formData: FormData
  ): Observable<any> {


    return this.http.put(

      `${this.api}/${id}`,

      formData,

      this.getHeaders()

    );


  }







  // ==========================
  // ELIMINAR PRODUCTO
  // ==========================

  eliminar(id: number): Observable<any> {


    return this.http.delete(

      `${this.api}/${id}`,

      this.getHeaders()

    );


  }


}