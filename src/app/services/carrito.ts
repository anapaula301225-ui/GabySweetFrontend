import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';


export interface ItemCarrito {

  producto: Producto;

  cantidad:number;

}



@Injectable({
  providedIn:'root'
})
export class CarritoService {


  private items:ItemCarrito[] = [];

  private readonly storageKey = "carrito";



  constructor(){

    this.cargarCarrito();

  }



  // ======================
  // CARGAR
  // ======================

  private cargarCarrito(){


    const data = localStorage.getItem(
      this.storageKey
    );



    if(data){


      try{


        const carrito = JSON.parse(data);



        // VALIDAR DATOS CORRECTOS

        this.items = carrito.filter(

          (item:any)=>

          item &&
          item.producto &&
          item.producto.precio !== undefined

        );



      }catch{


        this.items=[];


      }


    }



  }





  // ======================
  // GUARDAR
  // ======================


  private guardarCarrito(){


    localStorage.setItem(

      this.storageKey,

      JSON.stringify(this.items)

    );


  }





  obtenerCarrito(){


    return this.items;


  }





  // ======================
  // AGREGAR
  // ======================


  agregarProducto(

    producto:Producto,

    cantidad:number

  ){



    if(!producto){

      return;

    }



    const existe = this.items.find(

      item =>

      item.producto.id_producto === producto.id_producto

    );




    if(existe){


      existe.cantidad += cantidad;



    }else{



      this.items.push({

        producto,

        cantidad


      });


    }




    this.guardarCarrito();


  }







  // ======================
  // AUMENTAR
  // ======================


  aumentarCantidad(id:number){


    const item=this.items.find(

      x=>x.producto.id_producto===id

    );


    if(item){


      item.cantidad++;


      this.guardarCarrito();

    }


  }





  disminuirCantidad(id:number){


    const item=this.items.find(

      x=>x.producto.id_producto===id

    );



    if(item && item.cantidad>1){


      item.cantidad--;


      this.guardarCarrito();


    }


  }





  eliminarProducto(id:number){


    this.items=this.items.filter(

      x=>x.producto.id_producto!==id

    );


    this.guardarCarrito();


  }





  limpiarCarrito(){


    this.items=[];


    localStorage.removeItem(

      this.storageKey

    );


  }





  obtenerTotal():number{


    return this.items.reduce(


      (total,item)=>{


        if(!item.producto){

          return total;

        }



        return total +

        (

          Number(item.producto.precio)

          *

          item.cantidad

        );



      },

      0

    );


  }



}