import { 
  Component, 
  Input, 
  OnInit,
  OnChanges,
  SimpleChanges,
  inject 
} from '@angular/core';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { CarritoService } from '../../services/carrito';

import { Producto } from '../../models/producto';



@Component({

  selector: 'app-card-producto',

  standalone:true,

  imports:[],

  templateUrl:'./card-producto.html',

  styleUrl:'./card-producto.css'

})


export class CardProducto implements OnInit, OnChanges {



  // ==========================
  // INPUT PRODUCTO
  // ==========================


  @Input() id:number = 0;


  @Input() nombre:string = '';


  @Input() precio:number = 0;


  @Input() imagen:string = '';


  @Input() stock:number = 0;





  // ==========================
  // MODO COMPONENTE
  // ==========================


  @Input()

  modo:'home' | 'tienda' = 'home';





  rol:string = '';





  private carritoService = inject(CarritoService);


  private router = inject(Router);








  // ==========================
  // INICIO
  // ==========================


  ngOnInit():void{


    this.obtenerUsuario();


  }





  // ==========================
  // DETECTAR CAMBIOS INPUT
  // ==========================


  ngOnChanges(changes:SimpleChanges):void{


    if(changes['stock']){


      console.log(

        "CARD STOCK:",

        this.nombre,

        this.stock

      );


    }


  }








  // ==========================
  // OBTENER USUARIO
  // ==========================


  obtenerUsuario(){


    const usuario = localStorage.getItem('usuario');



    if(usuario){


      const datos = JSON.parse(usuario);


      this.rol = datos.rol ?? '';

    }


  }








  // ==========================
  // DETALLE
  // ==========================


  verDetalle(){


    this.router.navigate([

      '/producto',

      this.id

    ]);


  }








  // ==========================
  // EDITAR PRODUCTO ADMIN
  // ==========================


  editarProducto(){


    this.router.navigate([

      '/admin/productos',

      this.id

    ]);


  }








  // ==========================
  // AGREGAR CARRITO
  // ==========================


  agregarCarrito(){



    if(this.stock <= 0){



      Swal.fire({


        icon:'warning',


        title:'Producto agotado 🍰',


        text:'Este producto no tiene stock disponible.',


        confirmButtonText:'Aceptar',


        confirmButtonColor:'#D63384',


        background:'#FFF0F5'


      });


      return;


    }








    const producto:Producto = {



      id_producto:this.id,


      nombre:this.nombre,


      precio:this.precio,


      imagen:this.imagen,


      stock:this.stock,


      disponible:true



    };








    this.carritoService.agregarProducto(

      producto,

      1

    );








    Swal.fire({


      icon:'success',


      title:'Agregado al carrito 🛒',


      text:

      `${this.nombre} fue agregado correctamente.`,


      timer:1500,


      showConfirmButton:false,


      background:'#FFF0F5',


    });





  }



}