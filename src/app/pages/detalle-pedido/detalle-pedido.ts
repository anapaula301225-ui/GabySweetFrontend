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

import Swal from 'sweetalert2';

import { PedidoService } from '../../services/pedido';

import { DetallePedidoService } from '../../services/detalle-pedido';

import { environment } from '../../../environments/environment';


@Component({

  selector: 'app-detalle-pedido',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './detalle-pedido.html',

  styleUrl: './detalle-pedido.css'

})


export class DetallePedido implements OnInit {


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
        '/pedidos'
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
              'No se pudo cargar la información del pedido.',

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
              'No se pudieron cargar los productos del pedido.',

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
  // VOLVER A PEDIDOS
  // ==========================

  volverPedidos() {


    this.router.navigate([
      '/pedidos'
    ]);


  }


}