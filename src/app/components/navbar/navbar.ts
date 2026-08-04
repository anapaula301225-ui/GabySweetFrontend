import { 
  Component, 
  inject,
  OnInit,
  OnDestroy
} from '@angular/core';

import { 
  Router, 
  RouterLink, 
  RouterLinkActive 
} from '@angular/router';

import Swal from 'sweetalert2';



@Component({

  selector:'app-navbar',

  standalone:true,

  imports:[

    RouterLink,

    RouterLinkActive

  ],

  templateUrl:'./navbar.html',

  styleUrl:'./navbar.css'

})


export class Navbar implements OnInit, OnDestroy {



  private router = inject(Router);



  usuario:any = null;



  private intervalo:any;







  constructor(){


    this.cargarUsuario();


  }








  // ==========================
  // INICIO COMPONENTE
  // ==========================


  ngOnInit(){



    this.cargarUsuario();




    this.intervalo = setInterval(()=>{



      this.cargarUsuario();



    },500);



  }







  // ==========================
  // DESTRUIR COMPONENTE
  // ==========================


  ngOnDestroy(){



    if(this.intervalo){



      clearInterval(this.intervalo);



    }



  }









  // ==========================
  // CARGAR USUARIO
  // ==========================


  cargarUsuario(){



    const data = localStorage.getItem('usuario');



    this.usuario = data

    ? JSON.parse(data)

    : null;



  }









  // ==========================
  // ESTADO LOGIN
  // ==========================


  estaLogueado():boolean{


    return !!localStorage.getItem('token');


  }









  // ==========================
  // ROLES
  // ==========================


  esAdmin():boolean{


    return this.usuario?.rol === 'ADMIN';


  }





  esCliente():boolean{


    return this.usuario?.rol === 'CLIENTE';


  }









  // ==========================
  // CERRAR SESION
  // ==========================


  cerrarSesion(){



    Swal.fire({


      title:'¿Cerrar sesión?',


      text:'Tu sesión actual será cerrada.',


      icon:'warning',


      showCancelButton:true,


      confirmButtonText:'Sí, salir',


      cancelButtonText:'Cancelar',


      confirmButtonColor:'#D63384',


      cancelButtonColor:'#6B3E26'


    })

    .then((resultado)=>{



      if(!resultado.isConfirmed){


        return;


      }







      localStorage.removeItem('token');


      localStorage.removeItem('usuario');







      Swal.fire({


        title:'Sesión cerrada',


        text:'Has salido correctamente.',


        icon:'success',


        confirmButtonColor:'#D63384',


        timer:1500,


        showConfirmButton:false


      });







      setTimeout(()=>{



        this.router.navigate(['/']);

        window.location.reload();



      },1500);





    });




  }






}