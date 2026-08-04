import {
  Component,
  inject
} from '@angular/core';


import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';


import {
  RouterLink
} from '@angular/router';


import Swal from 'sweetalert2';



@Component({

  selector:'app-register',

  standalone:true,

  imports:[

    ReactiveFormsModule,

    RouterLink

  ],

  templateUrl:'./register.html',

  styleUrl:'./register.css'

})


export class Register {



  private fb =
  inject(FormBuilder);



  cargando:boolean = false;



  registerForm:FormGroup =
  this.fb.group({



    nombre:[

      '',

      Validators.required

    ],



    apellido:[

      '',

      Validators.required

    ],



    email:[

      '',

      [

        Validators.required,

        Validators.email

      ]

    ],



    password:[

      '',

      [

        Validators.required,

        Validators.minLength(6)

      ]

    ],



    confirmarPassword:[

      '',

      Validators.required

    ]



  });









  // ===============================
  // REGISTRAR
  // ===============================


  registrar(){



    if(this.registerForm.invalid){


      this.registerForm.markAllAsTouched();



      Swal.fire({


        icon:'warning',


        title:'Completa los campos',


        text:'Revisa la información ingresada.',


        confirmButtonColor:'#D63384'


      });



      return;


    }







    const datos =
    this.registerForm.value;





    if(datos.password !== datos.confirmarPassword){



      Swal.fire({


        icon:'error',


        title:'Contraseñas diferentes',


        text:'Las contraseñas no coinciden.',


        confirmButtonColor:'#D63384'


      });



      return;


    }







    this.cargando=true;





    console.log(

      "Usuario listo para registrar:",

      datos

    );







    /*
    
      AQUÍ IRÁ:

      this.authService.registrar(datos)

      .subscribe(...)

    */






    setTimeout(()=>{



      this.cargando=false;



      Swal.fire({


        icon:'success',


        title:'Cuenta creada 🍰',


        text:'Tu registro fue exitoso.',


        confirmButtonColor:'#D63384'


      });





      this.registerForm.reset();



    },800);




  }






}