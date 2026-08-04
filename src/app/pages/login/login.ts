import {
  Component,
  inject,
  AfterViewInit,
  NgZone
} from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';


import {
  FirebaseService
} from '../../services/firebase.service';


import {
  AuthService
} from '../../services/auth';


import {
  environment
} from '../../../environments/environment';


import Swal from 'sweetalert2';


declare const google:any;



@Component({

  selector:'app-login',

  standalone:true,

  imports:[

    RouterLink,

    ReactiveFormsModule,

    CommonModule

  ],

  templateUrl:'./login.html',

  styleUrl:'./login.css'

})


export class Login implements AfterViewInit {



  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private firebaseService = inject(FirebaseService);

  private router = inject(Router);

  private zone = inject(NgZone);



  cargando = false;



  loginForm = this.fb.group({



    email:[

      '',

      [

        Validators.required,

        Validators.email

      ]

    ],



    password:[

      '',

      Validators.required

    ]



  });








  // ==========================================
  // GOOGLE BUTTON
  // ==========================================


  ngAfterViewInit():void{


    if(typeof google === 'undefined'){


      console.error(
        "Google Identity Services no disponible"
      );


      return;


    }




    google.accounts.id.initialize({


      client_id:
      environment.googleClientId,


      callback:(response:any)=>{


        this.loginGoogle(
          response.credential
        );


      }


    });






    google.accounts.id.renderButton(


      document.getElementById(
        "googleButton"
      ),


      {


        theme:"outline",

        size:"large",

        width:330,

        shape:"pill"


      }


    );


  }









  // ==========================================
  // LOGIN NORMAL
  // ==========================================


  iniciarSesion(){



    if(this.loginForm.invalid){


      this.loginForm.markAllAsTouched();


      Swal.fire({

        icon:'warning',

        title:'Datos incompletos',

        text:'Ingrese correctamente su correo y contraseña.',

        confirmButtonColor:'#D63384',

        confirmButtonText:'Aceptar'


      });


      return;


    }




    this.cargando = true;




    const email =
    this.loginForm.value.email ?? '';



    const password =
    this.loginForm.value.password ?? '';





    this.authService.login(

      email,

      password

    )

    .subscribe({



      next:(respuesta)=>{


        this.guardarSesion(
          respuesta
        );


      },




      error:(error)=>{


        console.error(error);



        this.cargando=false;



        Swal.fire({

          icon:'error',

          title:'No se pudo iniciar sesión',

          text:

          error?.error?.message ||

          'Correo o contraseña incorrectos.',


          confirmButtonColor:'#D63384',

          confirmButtonText:'Aceptar'


        });


      }



    });



  }









  // ==========================================
  // LOGIN GOOGLE
  // ==========================================


  loginGoogle(token:string){



    this.cargando=true;




    this.authService

    .loginGoogle(token)

    .subscribe({



      next:(respuesta)=>{


        this.zone.run(()=>{


          this.guardarSesion(
            respuesta
          );


        });


      },





      error:(error)=>{


        console.error(
          "Error Google",
          error
        );



        this.cargando=false;



        Swal.fire({


          icon:'error',


          title:'Error con Google',


          text:'No fue posible iniciar sesión con Google.',


          confirmButtonColor:'#D63384'


        });



      }



    });



  }









  // ==========================================
  // GUARDAR SESIÓN
  // ==========================================


  private guardarSesion(
    respuesta:any
  ){



    localStorage.setItem(

      "token",

      respuesta.data.token

    );



    localStorage.setItem(

      "usuario",

      JSON.stringify(

        respuesta.data.usuario

      )

    );







    // TOKEN FIREBASE


    this.firebaseService

    .obtenerToken()

    .then(tokenFirebase=>{



      if(tokenFirebase){



        this.authService

        .guardarTokenFirebase(
          tokenFirebase
        )

        .subscribe({



          next:()=>{


            console.log(

              "Token Firebase registrado"

            );


          },



          error:(error)=>{


            console.error(

              "Error token Firebase",

              error

            );


          }



        });



      }



    })

    .catch(error=>{


      console.error(

        "Firebase token error",

        error

      );


    });









    Swal.fire({



      icon:'success',


      title:'¡Bienvenido a GabySweet! 🍰',


      text:'Inicio de sesión correcto.',


      confirmButtonColor:'#D63384',


      confirmButtonText:'Continuar',


      allowOutsideClick:false,


      allowEscapeKey:false



    })

    .then(()=>{





      const rol =
      respuesta.data.usuario.rol;




      if(rol === "ADMIN"){



        this.router.navigate([

          "/dashboard"

        ]);



      }

      else{



        this.router.navigate([

          "/"

        ]);



      }



    });



  }



}