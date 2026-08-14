import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { FormsModule } from '@angular/forms';

import { PedidoService } from '../../services/pedido';

import {
  DetallePedidoService
} from '../../services/detalle-pedido';

import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';


@Component({

  selector: 'app-admin-detalle-pedido',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './admin-detalle-pedido.html',

  styleUrl: './admin-detalle-pedido.css'

})


export class AdminDetallePedido implements OnInit {


  // ==========================
  // INYECCIÓN DE SERVICIOS
  // ==========================

  private route = inject(
    ActivatedRoute
  );


  private router = inject(
    Router
  );


  private pedidoService = inject(
    PedidoService
  );


  private detalleService = inject(
    DetallePedidoService
  );


  // ==========================
  // VARIABLES
  // ==========================

  idPedido!: number;


  pedido: any = null;


  detalle: any[] = [];


  cargando = true;


  // ==========================
  // ESTADOS DEL PEDIDO
  // ==========================

  estados = [

    'PENDIENTE',

    'EN_PREPARACION',

    'LISTO',

    'ENTREGADO',

    'CANCELADO'

  ];


  // ==========================
  // INICIALIZACIÓN
  // ==========================

  ngOnInit(): void {


    this.idPedido = Number(

      this.route
        .snapshot
        .paramMap
        .get('id')

    );


    // ==========================
    // VALIDAR ID
    // ==========================

    if (!this.idPedido) {

      Swal.fire({

        icon: 'error',

        title: 'Pedido inválido',

        text:
          'No se encontró el pedido solicitado.',

        confirmButtonColor:
          '#D63384'

      });


      this.router.navigate([
        '/admin/pedidos'
      ]);


      return;

    }


    // ==========================
    // CARGAR INFORMACIÓN
    // ==========================

    this.obtenerPedido();

    this.obtenerDetalle();

  }


  // ==========================
  // OBTENER PEDIDO
  // ==========================

  obtenerPedido() {


    this.pedidoService
      .obtener(this.idPedido)

      .subscribe({

        next: (respuesta) => {


          console.log(
            'Pedido:',
            respuesta
          );


          this.pedido =
            respuesta.data;


        },


        error: (error) => {


          console.error(
            'Error obteniendo pedido:',
            error
          );


          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              error.error?.message ??
              'No se pudo cargar el pedido.',

            confirmButtonColor:
              '#D63384'

          });


        }

      });


  }


  // ==========================
  // OBTENER DETALLE
  // ==========================

  obtenerDetalle() {


    this.detalleService
      .obtenerDetalle(this.idPedido)

      .subscribe({

        next: (respuesta) => {


          console.log(
            'Detalle:',
            respuesta
          );


          this.detalle =
            respuesta.data ?? [];


          this.cargando = false;


        },


        error: (error) => {


          console.error(
            'Error obteniendo detalle:',
            error
          );


          this.cargando = false;


          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              error.error?.message ??
              'No se pudo cargar el detalle del pedido.',

            confirmButtonColor:
              '#D63384'

          });


        }

      });


  }


  // ==========================
  // OBTENER URL DE IMAGEN
  // ==========================

  getImagenUrl(imagen: string): string {


    // ==========================
    // SIN IMAGEN
    // ==========================

    if (!imagen) {

      return 'assets/img/producto-default.png';

    }


    // ==========================
    // CLOUDINARY
    // ==========================

    if (

      imagen.startsWith('http://') ||

      imagen.startsWith('https://')

    ) {

      return imagen;

    }


    // ==========================
    // IMAGEN ANTIGUA
    // ==========================

    return `${environment.apiUrl.replace('/api', '')}/uploads/productos/${imagen}`;

  }


  // ==========================
  // CAMBIAR ESTADO
  // ==========================

  cambiarEstado() {


    // ==========================
    // VALIDAR PEDIDO
    // ==========================

    if (!this.pedido) {

      return;

    }


    // ==========================
    // ACTUALIZAR ESTADO
    // ==========================

    this.pedidoService.actualizar(

      this.idPedido,

      {

        estado: this.pedido.estado

      }

    )

    .subscribe({

      next: () => {


        Swal.fire({

          icon: 'success',

          title: 'Estado actualizado',

          text:
            `El pedido ahora está ${this.pedido.estado}`,

          timer: 1800,

          showConfirmButton: false

        });


      },


      error: (error) => {


        console.error(
          'Error actualizando estado:',
          error
        );


        Swal.fire({

          icon: 'error',

          title: 'Error',

          text:
            error.error?.message ??
            'No se pudo actualizar el estado del pedido.',

          confirmButtonColor:
            '#D63384'

        });


      }

    });


  }


  // ==========================
  // VOLVER
  // ==========================

  volver() {


    this.router.navigate([

      '/admin/pedidos'

    ]);


  }


}