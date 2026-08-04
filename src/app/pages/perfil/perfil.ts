import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

import Swal from 'sweetalert2';


@Component({

  selector:'app-perfil',

  standalone:true,

  imports:[

    CommonModule,

    FormsModule

  ],

  templateUrl:'./perfil.html',

  styleUrl:'./perfil.css'

})

export class Perfil implements OnInit {



  private authService = inject(AuthService);


  private router = inject(Router);





  // ==========================
  // DATOS USUARIO
  // ==========================


  usuario:any = {


    nombre:'',


    apellido:'',


    email:'',


    rol:''


  };





  editar = false;


  cargando = false;








  ngOnInit():void{


    this.cargarPerfil();


  }









  // ==========================
  // CARGAR PERFIL
  // ==========================


  cargarPerfil(){



    this.authService.obtenerPerfil()

    .subscribe({



      next:(respuesta)=>{



        console.log(

          "Perfil:",

          respuesta

        );



        this.usuario = respuesta.usuario;



        localStorage.setItem(

          'usuario',

          JSON.stringify(this.usuario)

        );



      },





      error:(error)=>{



        console.error(error);




        Swal.fire({


          icon:'error',


          title:'Error al cargar perfil',


          text:'No se pudo obtener la información del usuario.',


          confirmButtonColor:'#D63384',


          confirmButtonText:'Aceptar',


          background:'#FFF8FB',


          color:'#6B3E26'


        });



      }



    });



  }









  // ==========================
  // VALIDAR ADMIN
  // ==========================


  esAdmin():boolean{


    return this.usuario?.rol === 'ADMIN';


  }









  // ==========================
  // EDITAR
  // ==========================


  activarEdicion(){


    this.editar = true;


  }









  // ==========================
  // GUARDAR CAMBIOS
  // ==========================


  guardarCambios(){



    this.cargando = true;





    this.authService.actualizarPerfil({



      nombre:this.usuario.nombre,


      apellido:this.usuario.apellido,


      email:this.usuario.email



    })

    .subscribe({




      next:(respuesta)=>{



        console.log(respuesta);




        localStorage.setItem(


          'usuario',


          JSON.stringify(this.usuario)


        );





        this.cargando=false;


        this.editar=false;






        Swal.fire({



          icon:'success',


          title:'¡Perfil actualizado! 🍰',


          text:'Tus datos fueron guardados correctamente.',


          confirmButtonColor:'#D63384',


          confirmButtonText:'Aceptar',


          background:'#FFF8FB',


          color:'#6B3E26'



        });



      },







      error:(error)=>{



        console.error(error);



        this.cargando=false;





        Swal.fire({



          icon:'error',


          title:'Error al actualizar',


          text:

            error?.error?.message ??

            'No se pudieron guardar los cambios.',



          confirmButtonColor:'#D63384',


          confirmButtonText:'Aceptar',


          background:'#FFF8FB',


          color:'#6B3E26'



        });



      }



    });



  }









  // ==========================
  // DASHBOARD ADMIN
  // ==========================


  volverDashboard(){



    this.router.navigate([


      '/dashboard'


    ]);



  }









  // ==========================
  // SALIR
  // ==========================


  salir(){



    Swal.fire({


      icon:'warning',


      title:'¿Cerrar sesión?',


      text:'Tendrás que iniciar sesión nuevamente.',


      showCancelButton:true,


      confirmButtonText:'Sí, salir',


      cancelButtonText:'Cancelar',


      confirmButtonColor:'#D63384',


      cancelButtonColor:'#6B3E26',


      background:'#FFF8FB',


      color:'#6B3E26'



    })

    .then((resultado)=>{



      if(resultado.isConfirmed){



        this.authService.logout();



        this.router.navigate([


          '/login'


        ]);



      }



    });



  }



}