import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

interface DashboardResponse {
  success: boolean;
  data: {
    usuarios: number;
    productos: number;
    pedidos: number;
    pendientes: number;
    preparacion: number;
    entregados: number;
    ventas: number;
    ventasMes: number;
    pagosPendientes: number;
    pagos: {
      PAGADO: number;
      PENDIENTE: number;
      RECHAZADO: number;
    };
    productosVendidos: any[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/dashboard`;

  // ==========================
  // HEADERS JWT
  // ==========================

  private getHeaders() {

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No existe token en localStorage');
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ==========================
  // OBTENER RESUMEN DASHBOARD
  // ==========================

  obtenerResumen(): Observable<DashboardResponse> {

    return this.http.get<DashboardResponse>(
      this.api,
      this.getHeaders()
    );

  }

}