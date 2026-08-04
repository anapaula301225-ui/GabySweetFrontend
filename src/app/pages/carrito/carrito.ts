import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CarritoService } from '../../services/carrito';
import { PedidoService } from '../../services/pedido';
import { DetallePedidoService } from '../../services/detalle-pedido';


@Component({
  selector: 'app-carrito',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl:'./carrito.html',
  styleUrl:'./carrito.css'
})
export class Carrito implements OnInit {


private carritoService = inject(CarritoService);
private pedidoService = inject(PedidoService);
private detallePedidoService = inject(DetallePedidoService);
private router = inject(Router);



items:any[]=[];

total=0;

cargando=false;



mostrarFormulario=false;



pedido={

 tipo_entrega:'RECOJO',

 direccion_entrega:'',

 telefono_contacto:'',

 observaciones:''

};





ngOnInit():void{

 this.cargarCarrito();

}






cargarCarrito(){

 this.items=this.carritoService.obtenerCarrito();

 this.total=this.carritoService.obtenerTotal();

}






aumentarCantidad(id:number){

 this.carritoService.aumentarCantidad(id);

 this.cargarCarrito();

}





disminuirCantidad(id:number){

 this.carritoService.disminuirCantidad(id);

 this.cargarCarrito();

}







eliminarProducto(id:number){



Swal.fire({

 title:'¿Eliminar producto?',

 text:'El producto será retirado del carrito.',

 icon:'warning',

 showCancelButton:true,

 confirmButtonText:'Sí, eliminar',

 cancelButtonText:'Cancelar',

 confirmButtonColor:'#D63384',

 cancelButtonColor:'#6B3E26'

})
.then(resultado=>{


 if(resultado.isConfirmed){


  this.carritoService.eliminarProducto(id);


  this.cargarCarrito();



  Swal.fire({

   title:'Eliminado',

   text:'Producto retirado del carrito.',

   icon:'success',

   timer:1500,

   showConfirmButton:false

  });


 }


});



}






vaciarCarrito(){



Swal.fire({

 title:'¿Vaciar carrito completo?',

 text:'Se eliminarán todos los productos.',

 icon:'warning',

 showCancelButton:true,

 confirmButtonText:'Vaciar',

 cancelButtonText:'Cancelar',

 confirmButtonColor:'#D63384',

 cancelButtonColor:'#6B3E26'

})
.then(resultado=>{


 if(resultado.isConfirmed){


  this.carritoService.limpiarCarrito();

  this.cargarCarrito();



  Swal.fire({

   title:'Carrito vacío',

   icon:'success',

   timer:1500,

   showConfirmButton:false

  });


 }


});



}







continuarCompra(){


if(this.items.length===0){


 Swal.fire({

  title:'Carrito vacío',

  text:'Agrega productos antes de continuar.',

  icon:'info',

  confirmButtonColor:'#D63384'

 });


 return;

}


this.mostrarFormulario=true;


}









confirmarPedido(){



if(!this.pedido.telefono_contacto.trim()){


 Swal.fire({

  title:'Falta teléfono',

  text:'Ingrese un número de contacto.',

  icon:'warning',

  confirmButtonColor:'#D63384'

 });


 return;

}





if(
this.pedido.tipo_entrega==='DELIVERY'
&&
!this.pedido.direccion_entrega.trim()
){


 Swal.fire({

  title:'Falta dirección',

  text:'Ingrese la dirección de entrega.',

  icon:'warning',

  confirmButtonColor:'#D63384'

 });


 return;

}



this.cargando=true;




this.pedidoService.registrar(this.pedido)

.subscribe({



next:(respuesta)=>{


 const idPedido=respuesta.data.id_pedido;


 this.agregarProductosPedido(idPedido,0);



},




error:(error)=>{


 console.error(error);


 this.cargando=false;


 Swal.fire({

  title:'Error',

  text:
  error.error?.message ??
  'No se pudo registrar el pedido.',

  icon:'error',

  confirmButtonColor:'#D63384'

 });


}



});



}






agregarProductosPedido(

idPedido:number,

indice:number

){



if(indice>=this.items.length){



 this.cargando=false;


 this.carritoService.limpiarCarrito();


 this.cargarCarrito();


 this.mostrarFormulario=false;



 Swal.fire({

  title:'Pedido registrado',

  text:'Tu pedido fue creado correctamente.',

  icon:'success',

  confirmButtonColor:'#D63384'

 })
 .then(()=>{


  this.router.navigate(['/pedidos']);


 });



 return;

}




const item=this.items[indice];





this.detallePedidoService.agregarProducto(

idPedido,

{

 id_producto:item.producto.id_producto,

 cantidad:item.cantidad

}

)

.subscribe({



next:()=>{


 this.agregarProductosPedido(

 idPedido,

 indice+1

 );


},



error:(error)=>{


 console.error(error);


 this.cargando=false;



 Swal.fire({

  title:'Pedido cancelado',

  text:
  error.error?.message ??
  'Uno de los productos ya no tiene stock.',

  icon:'error',

  confirmButtonColor:'#D63384'

 });



 this.carritoService.limpiarCarrito();

 this.cargarCarrito();

 this.mostrarFormulario=false;


 this.router.navigate(['/']);

}



});



}



}