import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute
} from '@angular/router';

import {
  PagoService
} from '../../services/pago';

import {
  PedidoService
} from '../../services/pedido';

import {
  ComprobantePago
} from '../../components/comprobante-pago/comprobante-pago';

import Swal from 'sweetalert2';



@Component({

  selector:'app-pagos',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    ComprobantePago

  ],

  templateUrl:'./pagos.html',

  styleUrl:'./pagos.css'

})


export class Pagos implements OnInit {



private pagoService = inject(PagoService);

private pedidoService = inject(PedidoService);

private route = inject(ActivatedRoute);




// ==========================
// HISTORIAL
// ==========================


pagos:any[]=[];




// ==========================
// COMPROBANTE
// ==========================


mostrarComprobante=false;

datosComprobante:any=null;




// ==========================
// PEDIDO
// ==========================


pedido:any=null;

mostrarFormulario=false;




// ==========================
// DATOS PAGO
// ==========================


numeroPago="999888777";

qrPago="assets/images/yape-qr.jpeg";



pago={


id_pedido:null as number|null,


metodo_pago:'YAPE',


monto:0,


codigo_operacion:'',


codigo_seguridad:''


};






ngOnInit():void{


this.listarPagos();



this.route.queryParams.subscribe(params=>{


const id=Number(params['pedido']);


if(id){

this.cargarPedido(id);

}


});


}







// ==========================
// CAMBIO METODO
// ==========================


cambiarMetodo(){


this.pago.codigo_operacion='';

this.pago.codigo_seguridad='';


}






soloNumerosOperacion(){


this.pago.codigo_operacion =

this.pago.codigo_operacion

.replace(/\D/g,'')

.slice(0,8);


}





soloNumerosSeguridad(){


this.pago.codigo_seguridad =

this.pago.codigo_seguridad

.replace(/\D/g,'')

.slice(0,3);


}







// ==========================
// CARGAR PEDIDO
// ==========================


cargarPedido(id:number){


this.pedidoService.obtener(id)

.subscribe({


next:(respuesta)=>{


this.pedido=respuesta.data;


this.mostrarFormulario=true;


this.pago.id_pedido=id;


this.pago.monto=

Number(this.pedido.total);



},


error:(error)=>{


console.error(error);



Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo cargar el pedido.',

confirmButtonColor:'#D63384'

});


}



});


}








// ==========================
// LISTAR PAGOS
// ==========================


listarPagos(){


this.pagoService.listarPagos()

.subscribe({


next:(respuesta)=>{


this.pagos=respuesta.data;



},


error:(error)=>{


console.error(error);


}



});


}








// ==========================
// CONFIRMAR PAGO
// ==========================


confirmarPago(){



if(

this.pago.metodo_pago==='PLIN'

&&

!this.pago.codigo_operacion.trim()

){


Swal.fire({

icon:'warning',

title:'Código requerido',

text:'Ingrese el código de operación de Plin.',

confirmButtonColor:'#D63384'


});


return;


}






if(this.pago.metodo_pago==='YAPE'){



if(!this.pago.codigo_operacion.trim()){


Swal.fire({

icon:'warning',

title:'Código requerido',

text:'Ingrese el código de operación de Yape.',

confirmButtonColor:'#D63384'


});


return;


}





if(!this.pago.codigo_seguridad.trim()){


Swal.fire({

icon:'warning',

title:'Código requerido',

text:'Ingrese el código de seguridad de Yape.',

confirmButtonColor:'#D63384'


});


return;


}



}







if(!/^\d{8}$/.test(this.pago.codigo_operacion)){


Swal.fire({

icon:'warning',

title:'Código incorrecto',

text:'El código de operación debe tener exactamente 8 dígitos.',

confirmButtonColor:'#D63384'


});


return;


}






if(

this.pago.metodo_pago==='YAPE'

&&

!(/^\d{3}$/.test(this.pago.codigo_seguridad))

){


Swal.fire({

icon:'warning',

title:'Código incorrecto',

text:'El código de seguridad debe tener exactamente 3 dígitos.',

confirmButtonColor:'#D63384'


});


return;


}






Swal.fire({

title:'¿Confirmar pago?',

text:'El pago quedará pendiente hasta la validación del administrador.',

icon:'question',

showCancelButton:true,

confirmButtonText:'Confirmar',

cancelButtonText:'Cancelar',

confirmButtonColor:'#D63384'


}).then(result=>{



if(!result.isConfirmed){

return;

}





this.pagoService.registrarPago(this.pago)

.subscribe({



next:()=>{


Swal.fire({

icon:'success',

title:'Pago registrado 🍰',

text:'Tu pago fue enviado para revisión.',

confirmButtonColor:'#D63384'


});



this.mostrarFormulario=false;



this.pago={

id_pedido:null,

metodo_pago:'YAPE',

monto:0,

codigo_operacion:'',

codigo_seguridad:''

};



this.listarPagos();



},




error:(error)=>{


console.error(error);



Swal.fire({

icon:'error',

title:'Error',

text:

error.error?.message ??

'No se pudo registrar el pago.',

confirmButtonColor:'#D63384'


});


}



});



});



}






// ==========================
// GENERAR COMPROBANTE
// ==========================


generarComprobante(pago:any){



this.datosComprobante={


id_pago:pago.id_pago,


id_pedido:pago.id_pedido,


cliente:

`${pago.nombre ?? ''} ${pago.apellido ?? ''}`,


email:pago.email,


metodo_pago:pago.metodo_pago,


monto:pago.monto,


codigo_operacion:pago.codigo_operacion,


codigo_seguridad:pago.codigo_seguridad,


fecha_confirmacion:pago.fecha_confirmacion,


estado:pago.estado



};






const html=`


<html>

<body>


<h1 style="color:#D63384">

GabySweet 🍰

</h1>


<h2>

Comprobante de pago

</h2>


<p>

Pedido:

<b>#${pago.id_pedido}</b>

</p>


<p>

Cliente:

${this.datosComprobante.cliente}

</p>


<p>

Monto:

S/. ${pago.monto}

</p>


<p>

Método:

${pago.metodo_pago}

</p>


<p>

Estado:

${pago.estado}

</p>


</body>

</html>


`;







this.pagoService.generarComprobante({

id_pago:pago.id_pago,

html

})


.subscribe({



next:()=>{


this.mostrarComprobante=true;



Swal.fire({

icon:'success',

title:'Comprobante generado',

text:'El PDF fue creado correctamente.',

confirmButtonColor:'#D63384'


});



},



error:()=>{


Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo generar el comprobante.',

confirmButtonColor:'#D63384'


});


}



});




}







// ==========================
// DESCARGAR PDF
// ==========================


descargar(id:number){


this.pagoService.descargarComprobante(id)

.subscribe({


next:(archivo:Blob)=>{


const url=

window.URL.createObjectURL(archivo);



const a=document.createElement('a');


a.href=url;


a.download=`comprobante_${id}.pdf`;


a.click();



window.URL.revokeObjectURL(url);


},



error:()=>{


Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo descargar el comprobante.',

confirmButtonColor:'#D63384'


});


}



});


}








verPDF(id:number){


this.pagoService.descargarComprobante(id)

.subscribe((archivo)=>{


const url=

URL.createObjectURL(archivo);


window.open(url,'_blank');


});



}


}