import { 
  Component, 
  OnInit, 
  inject 
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { CardProducto } from '../../components/card-producto/card-producto';

import { ProductoService } from '../../services/producto';

import { Producto } from '../../models/producto';

import { WhatsappButton } 
from '../../components/whatsapp-button/whatsapp-button';
import { environment } from '../../../environments/environment';



@Component({

  selector: 'app-home',

  standalone: true,

  imports: [

    CardProducto,

    RouterLink,

    WhatsappButton

  ],

  templateUrl: './home.html',

  styleUrl: './home.css',

})


export class Home implements OnInit {



  private productoService = inject(ProductoService);
  urlImagen = environment.apiUrl.replace('/api', '') + '/uploads/';


  esAdmin = false;



  productos:Producto[] = [];





  ngOnInit():void {


    this.verificarRol();


    this.cargarProductos();


  }







  // ==========================
  // VERIFICAR ROL
  // ==========================


  verificarRol(){



    const usuario = localStorage.getItem('usuario');



    if(usuario){



      const datos = JSON.parse(usuario);



      this.esAdmin = datos.rol === 'ADMIN';



    }



  }








  // ==========================
  // CARGAR PRODUCTOS DESTACADOS
  // ==========================


  cargarProductos(){



    this.productoService.listar()

    .subscribe({



      next:(respuesta)=>{



        this.productos = 

        respuesta.data.slice(0,4);



      },



      error:(error)=>{



        console.error(

          "Error cargando productos destacados:",

          error

        );



      }



    });



  }




}