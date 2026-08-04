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
export class PagoService {

  private http = inject(HttpClient);

  private api =
    `${environment.apiUrl}/pagos`;



  // ==========================
  // TOKEN
  // ==========================

  private headers() {

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${localStorage.getItem('token')}`

      })

    };

  }



  // ==========================
  // REGISTRAR PAGO
  // ==========================

  registrarPago(data: any): Observable<any> {

    return this.http.post(

      this.api,

      data,

      this.headers()

    );

  }



  // ==========================
  // LISTAR MIS PAGOS
  // ==========================

  listarPagos(): Observable<any> {

    return this.http.get(

      `${this.api}/mis-pagos`,

      this.headers()

    );

  }

  // ==========================
// LISTAR TODOS LOS PAGOS
// SOLO ADMIN
// ==========================

listarTodos(): Observable<any> {

  return this.http.get(

    this.api,

    this.headers()

  );

}



  // ==========================
  // OBTENER PAGO
  // ==========================

  obtenerPago(id: number): Observable<any> {

    return this.http.get(

      `${this.api}/${id}`,

      this.headers()

    );

  }



  // ==========================
  // DESCARGAR PDF
  // ==========================

  descargarComprobante(id: number): Observable<Blob> {

    return this.http.get(

      `${this.api}/comprobante/${id}`,

      {

        ...this.headers(),

        responseType: 'blob'

      }

    );

  }

  // ==========================
// GENERAR COMPROBANTE PDF
// ==========================

generarComprobante(data:any):Observable<any>{

return this.http.post(

`${this.api}/generar-comprobante`,

data,

this.headers()

);

}



  // ==========================
  // ACTUALIZAR
  // SOLO ADMIN
  // ==========================

  actualizarPago(
    id: number,
    datos: any
  ): Observable<any> {

    return this.http.put(

      `${this.api}/${id}`,

      datos,

      this.headers()

    );

  }



  // ==========================
  // RECHAZAR
  // SOLO ADMIN
  // ==========================

  eliminarPago(id: number): Observable<any> {

    return this.http.delete(

      `${this.api}/${id}`,

      this.headers()

    );

  }

}