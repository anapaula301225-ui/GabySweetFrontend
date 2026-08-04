import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoService } from '../../services/pedido';

import Swal from 'sweetalert2';


@Component({

  selector: 'app-pedidos',

  standalone: true,

  imports: [

    CommonModule

  ],

  templateUrl: './pedidos.html',

  styleUrl: './pedidos.css',

})

export class Pedidos implements OnInit {



  // ==========================
  // SERVICIOS
  // ==========================


  private pedidoService = inject(PedidoService);


  private router = inject(Router);





  // ==========================
  // VARIABLES
  // ==========================


  pedidos: any[] = [];


  cargando = true;





  // ==========================
  // INICIO
  // ==========================


  ngOnInit(): void {


    this.listarPedidos();


  }







  // ==========================
  // LISTAR PEDIDOS
  // ==========================


  listarPedidos() {



    this.cargando = true;




    this.pedidoService.listar()

    .subscribe({



      next:(respuesta)=>{



        console.log(

          "Pedidos:",

          respuesta

        );



        this.pedidos = respuesta.data;



        this.cargando = false;



      },





      error:(error)=>{



        console.error(

          "Error cargando pedidos:",

          error

        );



        this.cargando = false;





        Swal.fire({


          icon:'error',


          title:'Error al cargar pedidos',


          text:

            error?.error?.message ??

            'No se pudieron cargar los pedidos.',



          confirmButtonText:'Aceptar',



          confirmButtonColor:'#D63384',



          background:'#FFF8FB',



          color:'#6B3E26'


        });



      }



    });



  }








  // ==========================
  // VER DETALLE PEDIDO
  // ==========================


  verDetalle(idPedido:number){



    console.log(

      "Pedido seleccionado:",

      idPedido

    );



    this.router.navigate([


      '/pedido',


      idPedido



    ]);



  }








  // ==========================
  // PAGAR PEDIDO
  // ==========================


  pagarPedido(idPedido:number){



    console.log(

      "Ir a pagar pedido:",

      idPedido

    );




    this.router.navigate([


      '/pagos'


    ],{


      queryParams:{


        pedido:idPedido


      }



    });



  }



}