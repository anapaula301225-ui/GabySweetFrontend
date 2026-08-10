import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  RouterLink,
  Router
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { DashboardService } from '../../services/dashboard';
import { AuthService } from '../../services/auth';
import { NotificacionService } from '../../services/notificacion';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    RouterLink,
    CommonModule
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private dashboardService = inject(DashboardService);

  private authService = inject(AuthService);

  private router = inject(Router);

  private notificacionService = inject(NotificacionService);

  private cdr = inject(ChangeDetectorRef);


  // ===============================
  // USUARIO LOGUEADO
  // ===============================

  usuario = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  );


  // ===============================
  // RESUMEN DASHBOARD
  // ===============================

  resumen: any = {

    usuarios: 0,

    productos: 0,

    pedidos: 0,

    pendientes: 0,

    preparacion: 0,

    entregados: 0,

    ventas: 0,

    ventasMes: 0,

    pagosPendientes: 0,

    pagos: {

      PAGADO: 0,

      PENDIENTE: 0,

      RECHAZADO: 0

    },

    productosVendidos: []

  };


  // ===============================
  // NOTIFICACIONES
  // ===============================

  notificaciones: any[] = [];

  cantidadNotificaciones: number = 0;

  mostrarNotificaciones: boolean = false;


  // ===============================
  // INICIALIZACIÓN
  // ===============================

  ngOnInit(): void {

    this.cargarDashboard();

    this.cargarNotificaciones();

  }


  // ===============================
  // DASHBOARD
  // ===============================

  cargarDashboard(): void {

    this.dashboardService
      .obtenerResumen()
      .subscribe({

        // ===============================
        // RESPUESTA EXITOSA
        // ===============================

        next: (respuesta: any) => {

          console.log(
            'Datos dashboard:',
            respuesta
          );


          // ===============================
          // ACTUALIZAR RESUMEN
          // ===============================

          this.resumen = {

            usuarios:
              Number(respuesta.data?.usuarios) || 0,

            productos:
              Number(respuesta.data?.productos) || 0,

            pedidos:
              Number(respuesta.data?.pedidos) || 0,

            pendientes:
              Number(respuesta.data?.pendientes) || 0,

            preparacion:
              Number(respuesta.data?.preparacion) || 0,

            entregados:
              Number(respuesta.data?.entregados) || 0,

            ventas:
              Number(respuesta.data?.ventas) || 0,

            ventasMes:
              Number(respuesta.data?.ventasMes) || 0,

            pagosPendientes:
              Number(respuesta.data?.pagosPendientes) || 0,

            pagos: {

              PAGADO:
                Number(
                  respuesta.data?.pagos?.PAGADO
                ) || 0,

              PENDIENTE:
                Number(
                  respuesta.data?.pagos?.PENDIENTE
                ) || 0,

              RECHAZADO:
                Number(
                  respuesta.data?.pagos?.RECHAZADO
                ) || 0

            },

            productosVendidos:
              respuesta.data?.productosVendidos || []

          };


          // ===============================
          // VERIFICAR DATOS
          // ===============================

          console.log(
            'Resumen actualizado:',
            this.resumen
          );

          console.log(
            'Usuarios:',
            this.resumen.usuarios
          );

          console.log(
            'Productos:',
            this.resumen.productos
          );

          console.log(
            'Pedidos:',
            this.resumen.pedidos
          );


          // ===============================
          // ACTUALIZAR VISTA
          // ===============================

          this.cdr.detectChanges();

        },


        // ===============================
        // ERROR
        // ===============================

        error: (error) => {

          console.error(
            'Error dashboard:',
            error
          );

          Swal.fire({

            icon: 'error',

            title: 'Dashboard',

            text:
              'No fue posible cargar el resumen del negocio.',

            confirmButtonColor: '#D63384'

          });

        }

      });

  }


  // ===============================
  // NOTIFICACIONES
  // ===============================

  cargarNotificaciones(): void {


    // ===============================
    // LISTAR NOTIFICACIONES
    // ===============================

    this.notificacionService
      .listar()
      .subscribe({

        next: (respuesta: any) => {

          this.notificaciones =
            respuesta.data || [];

        },

        error: (error) => {

          console.error(
            'Error cargando notificaciones:',
            error
          );

        }

      });


    // ===============================
    // CONTADOR
    // ===============================

    this.notificacionService
      .contador()
      .subscribe({

        next: (respuesta: any) => {

          this.cantidadNotificaciones =
            Number(respuesta.total) || 0;

        },

        error: (error) => {

          console.error(
            'Error contador:',
            error
          );

        }

      });

  }


  // ===============================
  // ABRIR / CERRAR NOTIFICACIONES
  // ===============================

  abrirNotificaciones(): void {

    this.mostrarNotificaciones =
      !this.mostrarNotificaciones;

  }


  // ===============================
  // MARCAR COMO LEÍDA
  // ===============================

  marcarLeida(id: number): void {

    this.notificacionService
      .marcarLeida(id)
      .subscribe({

        next: () => {

          this.cargarNotificaciones();

        },

        error: (error) => {

          console.error(
            'Error marcando notificación:',
            error
          );

          Swal.fire({

            icon: 'error',

            title: 'Notificaciones',

            text:
              'No se pudo marcar la notificación como leída.',

            confirmButtonColor: '#D63384'

          });

        }

      });

  }


  // ===============================
  // CERRAR SESIÓN
  // ===============================

  cerrarSesion(): void {

    Swal.fire({

      title: '¿Cerrar sesión?',

      text:
        'Tendrás que volver a iniciar sesión.',

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Sí, salir',

      cancelButtonText: 'Cancelar',

      confirmButtonColor: '#D63384',

      cancelButtonColor: '#6C757D',

      reverseButtons: true

    }).then((resultado) => {

      if (resultado.isConfirmed) {

        this.authService.logout();


        Swal.fire({

          icon: 'success',

          title: 'Sesión cerrada',

          text: 'Hasta pronto 👋',

          timer: 1500,

          showConfirmButton: false

        }).then(() => {

          this.router.navigate([
            '/login'
          ]);

        });

      }

    });

  }

}