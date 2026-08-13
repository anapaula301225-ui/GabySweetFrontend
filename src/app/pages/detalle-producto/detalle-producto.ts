import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

import { CarritoService } from '../../services/carrito';
import { environment } from '../../../environments/environment';



@Component({

  selector:'app-detalle-producto',

  standalone:true,

  imports:[

    CommonModule

  ],

  templateUrl:'./detalle-producto.html',

  styleUrl:'./detalle-producto.css'

})


export class DetalleProducto implements OnInit {



private route = inject(ActivatedRoute);

private router = inject(Router);

private productoService = inject(ProductoService);

private carritoService = inject(CarritoService);





producto!:Producto;


cantidad=1;


rol='';



urlImagen = '';






ngOnInit():void{



const usuario = localStorage.getItem('usuario');



if(usuario){


const datos = JSON.parse(usuario);


this.rol = datos.rol;


}





const id = Number(

this.route.snapshot.paramMap.get('id')

);



if(id){


this.obtenerProducto(id);


}





}









obtenerProducto(id:number){



this.productoService.obtener(id)

.subscribe({



next:(respuesta)=>{


console.log(

"Producto detalle:",

respuesta

);



this.producto = respuesta.data;



},




error:(error)=>{


console.error(error);



Swal.fire({

icon:'error',

title:'Producto no encontrado',

text:

'No se pudo cargar la información del producto.',

confirmButtonColor:'#D63384'


});



}



});



}









obtenerUrlImagen(imagen:string | undefined){



if(!imagen){


return 'assets/images/no-image.png';


}



if(imagen.startsWith('http')){


return imagen;


}



return this.urlImagen + imagen;



}









aumentarCantidad(){



if(

this.producto &&

this.cantidad < this.producto.stock

){


this.cantidad++;


}



}









disminuirCantidad(){



if(this.cantidad > 1){


this.cantidad--;


}



}









agregarCarrito(){



const productoCarrito:Producto = {



...this.producto,


imagen:this.obtenerUrlImagen(

this.producto.imagen

)



};





this.carritoService.agregarProducto(

productoCarrito,

this.cantidad

);







Swal.fire({

icon:'success',

title:'Producto agregado',

text:

`${this.producto.nombre} fue agregado al carrito.`,

showConfirmButton:false,

timer:1800,

toast:true,

position:'top-end',

background:'#fff8fb',

iconColor:'#D63384'


});






console.log(

"Carrito actual:",

this.carritoService.obtenerCarrito()

);



}









editarProducto(){



this.router.navigate([

'/admin/productos',

this.producto.id_producto

]);



}



}