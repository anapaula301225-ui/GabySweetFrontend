import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  RouterLink,
  Router
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { DashboardService }
from '../../services/dashboard';

import { AuthService }
from '../../services/auth';

import { NotificacionService }
from '../../services/notificacion';

import Swal from 'sweetalert2';


@Component({

selector:'app-dashboard',

standalone:true,

imports:[

RouterLink,

CommonModule

],

templateUrl:'./dashboard.html',

styleUrl:'./dashboard.css'

})

export class Dashboard implements OnInit {



private dashboardService =
inject(DashboardService);

private authService =
inject(AuthService);

private router =
inject(Router);

private notificacionService =
inject(NotificacionService);





// ===============================
// USUARIO LOGUEADO
// ===============================

usuario = JSON.parse(

localStorage.getItem('usuario') || '{}'

);





// ===============================
// RESUMEN DASHBOARD
// ===============================

resumen:any={

usuarios:0,

productos:0,

pedidos:0,

pendientes:0,

preparacion:0,

entregados:0,

ventas:0,

ventasMes:0,

pagosPendientes:0,

pagos:{

PAGADO:0,

PENDIENTE:0,

RECHAZADO:0

},

productosVendidos:[]

};





// ===============================
// NOTIFICACIONES
// ===============================

notificaciones:any[]=[];

cantidadNotificaciones:number=0;

mostrarNotificaciones:boolean=false;





ngOnInit(){

this.cargarDashboard();

this.cargarNotificaciones();

}





// ===============================
// DASHBOARD
// ===============================

cargarDashboard(){

this.dashboardService

.obtenerResumen()

.subscribe({

next:(respuesta)=>{

console.log(

"Datos dashboard:",

respuesta

);

this.resumen =
respuesta.data;

},

error:(error)=>{

console.error(

"Error dashboard",

error

);

Swal.fire({

icon:'error',

title:'Dashboard',

text:'No fue posible cargar el resumen del negocio.',

confirmButtonColor:'#D63384'

});

}

});

}





// ===============================
// NOTIFICACIONES
// ===============================

cargarNotificaciones(){

// ===============================
// LISTAR NOTIFICACIONES
// ===============================

this.notificacionService

.listar()

.subscribe({

next:(respuesta)=>{

this.notificaciones =
respuesta.data;

},

error:(error)=>{

console.error(

"Error cargando notificaciones",

error

);

// Solo registramos el error.
// No mostramos alerta para no molestar
// al administrador cada vez que entra.

}

});



// ===============================
// CONTADOR DE NOTIFICACIONES
// ===============================

this.notificacionService

.contador()

.subscribe({

next:(respuesta)=>{

this.cantidadNotificaciones =
respuesta.total;

},

error:(error)=>{

console.error(

"Error contador",

error

);

}

});

}

  // ===============================
  // ABRIR / CERRAR PANEL NOTIFICACIONES
  // ===============================

  abrirNotificaciones(){

    this.mostrarNotificaciones =

    !this.mostrarNotificaciones;

  }





  // ===============================
  // MARCAR COMO LEÍDA
  // ===============================

  marcarLeida(id:number){

    this.notificacionService

    .marcarLeida(id)

    .subscribe({

      next:()=>{

        this.cargarNotificaciones();

      },

      error:(error)=>{

        console.error(

          "Error marcando notificación",

          error

        );

        Swal.fire({

          icon:'error',

          title:'Notificaciones',

          text:'No se pudo marcar la notificación como leída.',

          confirmButtonColor:'#D63384'

        });

      }

    });

  }





  // ===============================
  // CERRAR SESIÓN
  // ===============================

  cerrarSesion(){

    Swal.fire({

      title:'¿Cerrar sesión?',

      text:'Tendrás que volver a iniciar sesión.',

      icon:'question',

      showCancelButton:true,

      confirmButtonText:'Sí, salir',

      cancelButtonText:'Cancelar',

      confirmButtonColor:'#D63384',

      cancelButtonColor:'#6C757D',

      reverseButtons:true

    }).then((resultado)=>{

      if(resultado.isConfirmed){

        this.authService.logout();

        Swal.fire({

          icon:'success',

          title:'Sesión cerrada',

          text:'Hasta pronto 👋',

          timer:1500,

          showConfirmButton:false

        }).then(()=>{

          this.router.navigate([

            '/login'

          ]);

        });

      }

    });

  }

}