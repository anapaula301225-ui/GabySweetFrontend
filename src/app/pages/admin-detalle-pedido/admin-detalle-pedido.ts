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

import { DetallePedidoService }
from '../../services/detalle-pedido';

import Swal from 'sweetalert2';



@Component({

  selector:'app-admin-detalle-pedido',

  standalone:true,

  imports:[
    CommonModule,
    FormsModule
  ],

  templateUrl:'./admin-detalle-pedido.html',

  styleUrl:'./admin-detalle-pedido.css'

})


export class AdminDetallePedido implements OnInit {


private route = inject(ActivatedRoute);

private router = inject(Router);


private pedidoService = inject(PedidoService);

private detalleService = inject(DetallePedidoService);



idPedido!:number;


pedido:any = null;


detalle:any[]=[];


cargando=true;



estados=[

'PENDIENTE',

'EN_PREPARACION',

'LISTO',

'ENTREGADO',

'CANCELADO'

];





ngOnInit():void{


this.idPedido = Number(

this.route.snapshot.paramMap.get('id')

);



this.obtenerPedido();


this.obtenerDetalle();


}







obtenerPedido(){


this.pedidoService.obtener(this.idPedido)

.subscribe({


next:(respuesta)=>{


this.pedido=respuesta.data;


},


error:(error)=>{


console.error(error);


Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo cargar el pedido'

});


}


});


}








obtenerDetalle(){


this.detalleService.obtenerDetalle(this.idPedido)

.subscribe({


next:(respuesta)=>{


this.detalle=respuesta.data;


this.cargando=false;


},


error:(error)=>{


console.error(error);


this.cargando=false;



Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo cargar el detalle del pedido'

});


}


});


}









cambiarEstado(){



this.pedidoService.actualizar(

this.idPedido,

{

estado:this.pedido.estado

}

)



.subscribe({



next:()=>{



Swal.fire({

icon:'success',

title:'Estado actualizado',

text:`El pedido ahora está ${this.pedido.estado}`,

timer:1800,

showConfirmButton:false

});



},




error:(error)=>{



console.error(error);



Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo actualizar el estado del pedido'

});



}



});



}







volver(){


this.router.navigate([

'/admin/pedidos'

]);


}



}