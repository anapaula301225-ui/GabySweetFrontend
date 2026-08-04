import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoService } from '../../services/pago';



@Component({

selector:'app-admin-pagos',

standalone:true,

imports:[
 CommonModule
],

templateUrl:'./admin-pagos.html',

styleUrl:'./admin-pagos.css'

})

export class AdminPagos implements OnInit{


private pagoService = inject(PagoService);



pagos:any[]=[];


cargando=true;



ngOnInit():void{

 this.listarPagos();

}





// ==========================
// LISTAR PAGOS
// ==========================

listarPagos(){


this.cargando=true;



this.pagoService.listarTodos()

.subscribe({


next:(respuesta)=>{


console.log(
 "Pagos administrador:",
 respuesta
);



this.pagos = respuesta.data ?? respuesta;



this.cargando=false;


},


error:(error)=>{


console.error(
 "Error pagos:",
 error
);


this.cargando=false;


}



});


}





// ==========================
// CONFIRMAR PAGO
// ==========================

confirmarPago(id:number){



if(!confirm(
'¿Confirmar este pago?'
)){

return;

}




this.pagoService.actualizarPago(

id,

{
 estado:'PAGADO'
}

)

.subscribe({


next:()=>{


alert(
"Pago confirmado correctamente."
);


this.listarPagos();


},


error:(error)=>{


alert(
error.error?.message ??
"Error al confirmar pago."
);


}


});

}





// ==========================
// RECHAZAR PAGO
// ==========================

rechazarPago(id:number){


if(!confirm(
'¿Rechazar este pago?'
)){

return;

}



this.pagoService.eliminarPago(id)

.subscribe({


next:()=>{


alert(
"Pago rechazado."
);


this.listarPagos();


},


error:(error)=>{


alert(
error.error?.message ??
"Error al rechazar pago."
);


}


});


}



}