import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PedidoService } from '../../services/pedido';

import Swal from 'sweetalert2';



@Component({

selector:'app-admin-pedidos',

standalone:true,

imports:[

    CommonModule

],

templateUrl:'./admin-pedidos.html',

styleUrl:'./admin-pedidos.css'

})


export class AdminPedidos implements OnInit {



private router = inject(Router);

private pedidoService = inject(PedidoService);




pedidos:any[]=[];


cargando=true;




estados=[


    'PENDIENTE',

    'EN_PREPARACION',

    'LISTO',

    'ENTREGADO',

    'CANCELADO'


];







ngOnInit():void{


    this.listarPedidos();


}









// =====================================
// LISTAR PEDIDOS
// =====================================


listarPedidos(){


    this.cargando=true;



    this.pedidoService.listar()

    .subscribe({



        next:(respuesta)=>{



            console.log(

                "Pedidos administrador:",

                respuesta

            );



            this.pedidos = respuesta.data ?? respuesta;



            this.cargando=false;



        },



        error:(error)=>{



            console.error(error);



            this.cargando=false;



            Swal.fire({


                title:'Error',

                text:'No se pudieron cargar los pedidos.',

                icon:'error',

                confirmButtonColor:'#D63384',

                background:'#FFF8FB',

                color:'#6B3E26'


            });



        }



    });



}









// =====================================
// CAMBIAR ESTADO
// =====================================


cambiarEstado(

idPedido:number,

estado:string

){



Swal.fire({



    title:'¿Actualizar estado?',


    text:`El pedido cambiará a ${estado}.`,


    icon:'question',



    showCancelButton:true,


    confirmButtonText:'Actualizar',


    cancelButtonText:'Cancelar',



    confirmButtonColor:'#D63384',


    cancelButtonColor:'#6B3E26',



    background:'#FFF8FB',

    color:'#6B3E26'


})

.then((resultado)=>{



if(resultado.isConfirmed){



this.pedidoService.actualizar(

    idPedido,

    {

        estado:estado

    }

)


.subscribe({



next:()=>{


    Swal.fire({


        title:'Estado actualizado',

        text:'El pedido fue actualizado correctamente.',

        icon:'success',

        confirmButtonColor:'#D63384',

        background:'#FFF8FB',

        color:'#6B3E26'


    });



    this.listarPedidos();



},



error:(error)=>{


    Swal.fire({


        title:'Error',

        text:

        error.error?.message ??

        'No se pudo actualizar el pedido.',


        icon:'error',

        confirmButtonColor:'#D63384',

        background:'#FFF8FB',

        color:'#6B3E26'


    });



}



});



}



});



}










// =====================================
// CANCELAR PEDIDO
// =====================================


cancelarPedido(idPedido:number){



Swal.fire({



    title:'¿Cancelar pedido?',


    text:'Esta acción cambiará el pedido a CANCELADO.',


    icon:'warning',



    showCancelButton:true,


    confirmButtonText:'Sí, cancelar',


    cancelButtonText:'Volver',



    confirmButtonColor:'#D63384',


    cancelButtonColor:'#6B3E26',



    background:'#FFF8FB',


    color:'#6B3E26'


})

.then((resultado)=>{



if(resultado.isConfirmed){



this.pedidoService.cancelar(idPedido)


.subscribe({



next:()=>{



    Swal.fire({


        title:'Pedido cancelado',

        text:'El pedido fue cancelado correctamente.',

        icon:'success',

        confirmButtonColor:'#D63384',

        background:'#FFF8FB',

        color:'#6B3E26'


    });



    this.listarPedidos();



},




error:()=>{


    Swal.fire({


        title:'Error',

        text:'No se pudo cancelar el pedido.',

        icon:'error',

        confirmButtonColor:'#D63384',

        background:'#FFF8FB',

        color:'#6B3E26'


    });



}



});



}



});



}







verDetalle(idPedido:number){


this.router.navigate([

    '/admin/pedido',

    idPedido

]);


}



}