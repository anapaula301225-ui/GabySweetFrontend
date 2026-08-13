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
  CardProducto
} from '../../components/card-producto/card-producto';


import {
  ProductoService
} from '../../services/producto';


import {
  Producto
} from '../../models/producto';


import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';



@Component({

  selector:'app-productos',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule,

    CardProducto

  ],

  templateUrl:'./productos.html',

  styleUrl:'./productos.css'

})


export class Productos implements OnInit {



  private productoService =
    inject(ProductoService);



  // ===============================
  // DATOS
  // ===============================


  productos:Producto[] = [];


  productosFiltrados:Producto[] = [];



  busqueda:string = '';



urlImagen = environment.apiUrl.replace('/api', '') + '/uploads/';

  cargando:boolean = true;



  // ===============================
  // INICIO
  // ===============================


  ngOnInit():void{


    this.listarProductos();


  }





  // ===============================
  // LISTAR PRODUCTOS
  // ===============================


  listarProductos(){


    this.cargando = true;



    this.productoService
    .listarDisponibles()

    .subscribe({


      next:(respuesta)=>{


        console.log("RESPUESTA API:", respuesta);


        console.log(
            "PRODUCTOS CON STOCK:",
            respuesta.data.map((p:any)=>({

                nombre:p.nombre,

                stock:p.stock,

                tipo:typeof p.stock

            }))
        );


        this.productos =
        respuesta.data ?? [];


        this.productosFiltrados =
        [...this.productos];


        this.cargando=false;


      },


      error:(error)=>{

        console.error(
          "Error productos:",
          error
        );

      }


    });


}







  // ===============================
  // BUSCAR
  // ===============================


  buscarProducto(){



    const texto =
    this.busqueda
    .toLowerCase()
    .trim();




    if(!texto){



      this.productosFiltrados =
      [...this.productos];



      return;


    }







    this.productosFiltrados =

    this.productos.filter(producto =>



      producto.nombre

      .toLowerCase()

      .includes(texto)



    );



  }








  // ===============================
  // IMAGEN
  // ===============================


  obtenerUrlImagen(
    imagen:string | undefined
  ):string {



    if(!imagen){


      return 'assets/images/no-image.png';


    }



    return this.urlImagen + imagen;



  }



}