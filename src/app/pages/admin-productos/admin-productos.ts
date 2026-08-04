import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

import Swal from 'sweetalert2';



@Component({

  selector:'app-admin-productos',

  standalone:true,

  imports:[

    ReactiveFormsModule,

    FormsModule

  ],

  templateUrl:'./admin-productos.html',

  styleUrl:'./admin-productos.css'

})


export class AdminProductos implements OnInit {



private productoService = inject(ProductoService);

private fb = inject(FormBuilder);

private route = inject(ActivatedRoute);




productos:Producto[]=[];


textoBusqueda='';


cargando=true;



mostrarFormulario=false;


modoEdicion=false;


idProductoEditando:number|null=null;



imagenSeleccionada:File|null=null;


nombreImagen='';





productoForm=this.fb.group({



nombre:[

 '',

 Validators.required

],



descripcion:[

 ''

],



precio:[

 0,

 [

 Validators.required,

 Validators.min(1)

 ]

],




stock:[

 0,

 Validators.required

],




disponible:[

 true

]



});








ngOnInit():void{


this.listarProductos();



this.route.paramMap.subscribe(params=>{


const id=params.get('id');



if(id){


this.cargarProductoEditar(

Number(id)

);


}



});



}









listarProductos(){



this.cargando=true;



this.productoService.listar()

.subscribe({



next:(respuesta)=>{


this.productos=

respuesta.data;



this.cargando=false;



},




error:(error)=>{


console.error(error);


this.cargando=false;



}



});



}









cargarProductoEditar(id:number){



this.productoService.obtener(id)

.subscribe({


next:(respuesta)=>{


this.editarProducto(

respuesta.data

);



},



error:()=>{


Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo cargar el producto.'

});


}



});



}









buscarProductos(){



const nombre=this.textoBusqueda.trim();



if(nombre===''){


this.listarProductos();


return;


}





this.productoService.buscar(nombre)

.subscribe({



next:(respuesta)=>{


this.productos=

respuesta.data;



},



error:(error)=>{


console.error(error);


}



});



}









abrirFormulario(){



this.mostrarFormulario=true;


this.modoEdicion=false;


this.idProductoEditando=null;


this.imagenSeleccionada=null;


this.nombreImagen='';




this.productoForm.reset({


nombre:'',

descripcion:'',

precio:0,

stock:0,

disponible:true



});



}









editarProducto(producto:Producto){



this.mostrarFormulario=true;


this.modoEdicion=true;


this.idProductoEditando=

producto.id_producto!;




this.productoForm.patchValue({



nombre:producto.nombre,


descripcion:producto.descripcion,


precio:producto.precio,


stock:producto.stock,


disponible:producto.disponible



});



}









cancelar(){



this.mostrarFormulario=false;


this.modoEdicion=false;


this.idProductoEditando=null;


this.imagenSeleccionada=null;


this.nombreImagen='';



this.productoForm.reset({


nombre:'',

descripcion:'',

precio:0,

stock:0,

disponible:true


});



}









seleccionarImagen(event:Event){



const input=

event.target as HTMLInputElement;



if(input.files && input.files.length){



this.imagenSeleccionada=

input.files[0];


this.nombreImagen=

this.imagenSeleccionada.name;



}



}









private crearFormData():FormData{



const formData=

new FormData();



formData.append(

'nombre',

this.productoForm.value.nombre!

);




formData.append(

'descripcion',

this.productoForm.value.descripcion || ''

);




formData.append(

'precio',

String(

this.productoForm.value.precio

)

);



formData.append(

'stock',

String(

this.productoForm.value.stock

)

);



formData.append(

'disponible',

String(

this.productoForm.value.disponible

)

);




if(this.imagenSeleccionada){


formData.append(

'imagen',

this.imagenSeleccionada

);


}




return formData;



}









guardarProducto(){



if(this.productoForm.invalid){


this.productoForm.markAllAsTouched();


return;


}




const formData=

this.crearFormData();






if(this.modoEdicion){



this.productoService.actualizar(

this.idProductoEditando!,

formData

)

.subscribe({



next:()=>{



Swal.fire({

icon:'success',

title:'Producto actualizado',

text:'Cambios guardados correctamente.',

timer:1800,

showConfirmButton:false

});



this.cancelar();


this.listarProductos();



},



error:()=>{



Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo actualizar el producto.'

});



}



});



}

else{



this.productoService.registrar(

formData

)

.subscribe({



next:()=>{



Swal.fire({

icon:'success',

title:'Producto registrado',

text:'Producto agregado correctamente.',

timer:1800,

showConfirmButton:false

});



this.cancelar();


this.listarProductos();



},



error:()=>{


Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo registrar el producto.'

});



}



});



}



}









eliminarProducto(id:number|undefined){



if(!id)return;





Swal.fire({



title:'¿Eliminar producto?',


text:'Esta acción no se puede deshacer.',


icon:'warning',


showCancelButton:true,


confirmButtonColor:'#D63384',


cancelButtonColor:'#6B3E26',


confirmButtonText:'Eliminar',


cancelButtonText:'Cancelar'



})

.then(resultado=>{



if(!resultado.isConfirmed)

return;






this.productoService.eliminar(id)

.subscribe({



next:(respuesta)=>{


Swal.fire({

icon:'success',

title:'Eliminado',

text:respuesta.message,

timer:1800,

showConfirmButton:false

});



this.listarProductos();



},



error:()=>{


Swal.fire({

icon:'error',

title:'Error',

text:'No se pudo eliminar el producto.'

});


}



});




});



}



}