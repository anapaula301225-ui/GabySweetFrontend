import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({

  selector: 'app-comprobante-pago',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './comprobante-pago.html',

  styleUrl: './comprobante-pago.css'

})

export class ComprobantePago {

  @Input()
  pago: any;

  // ==========================
  // DATOS DEL COMPROBANTE
  // ==========================

  @Input()
  datos: any = null;

  // ==========================
  // MOSTRAR / OCULTAR
  // ==========================

  @Input()
  visible = false;

  // ==========================
  // EVENTO CERRAR
  // ==========================

  @Output()
  cerrar =
  new EventEmitter<void>();

  cerrarModal() {

    this.cerrar.emit();

  }

  // ==========================
  // IMPRIMIR
  // ==========================

  imprimir() {


const contenido =
document.querySelector('.comprobante')?.innerHTML;



const ventana =
window.open(
'',
'_blank',
'width=700,height=900'
);



ventana!.document.write(`


<html>

<head>

<title>
Comprobante GabySweet
</title>


<style>


body{

font-family:Arial, sans-serif;

padding:20px;

background:white;

}


.comprobante{

width:500px;

margin:auto;

}



/* CABECERA */

.cabecera{

text-align:center;

color:#ff5c93;

}


.logo-circulo{

font-size:40px;

}



/* NUMEROS */

.numeros{

display:flex;

gap:15px;

margin:20px 0;

}


.tarjeta-numero{

flex:1;

border:1px solid #eee;

padding:15px;

border-radius:12px;

}



/* BLOQUES */

.bloque{

border:1px solid #eee;

border-radius:15px;

padding:15px;

margin-top:15px;

}



.bloque h3{

color:#ff5c93;

font-size:15px;

}



.dato{

display:flex;

justify-content:space-between;

padding:8px 0;

border-bottom:1px dashed #ddd;

}



.sin-borde{

border:none;

}



/* MONTO */


.monto{

margin-top:15px;

background:#fff0f5;

padding:15px;

border-radius:15px;

text-align:center;

}


.monto strong{

display:block;

font-size:28px;

color:#ff5c93;

}



/* ESTADO */


.estado-pagado{

background:#d4edda;

padding:15px;

border-radius:15px;

text-align:center;

margin-top:20px;

}



.pie{

text-align:center;

margin-top:25px;

font-size:12px;

}



.acciones{

display:none;

}


</style>


</head>


<body>


<article class="comprobante">

${contenido}

</article>


</body>


</html>


`);



ventana!.document.close();



ventana!.print();


}

obtenerEstilosImpresion(){


return `


body{

font-family:Arial,Helvetica,sans-serif;

background:white;

padding:20px;

}



.comprobante{

width:550px;

margin:auto;

border:2px solid #ffabc0;

border-radius:20px;

overflow:hidden;

}



.cabecera{

text-align:center;

color:#ef5f86;

padding:20px;

}



.logo-circulo{

font-size:40px;

}



.cabecera h1{

font-family:Georgia,serif;

font-size:45px;

margin:0;

}



.subtitulo{

font-weight:bold;

letter-spacing:3px;

}



.cabecera h2{

background:#f7ccda;

padding:10px;

color:#8e1741;

}



.contenido{

padding:20px;

}



.numeros{

display:flex;

gap:15px;

}



.tarjeta-numero{

flex:1;

border:1px solid #ffabc0;

border-radius:15px;

padding:15px;

text-align:center;

}



.bloque{

border:1px solid #ffabc0;

border-radius:15px;

padding:20px;

margin-top:20px;

}



.bloque h3{

color:#ef5f86;

}



.dato{

display:flex;

justify-content:space-between;

padding:8px;

border-bottom:1px dashed #ddd;

}



.monto{

background:#fff1ca;

padding:15px;

border-radius:10px;

display:flex;

justify-content:space-between;

font-size:22px;

}



.monto strong{

font-size:35px;

color:#cf0a3b;

}



.estado-pagado{

margin-top:20px;

padding:15px;

background:#f2fff5;

border-radius:15px;

text-align:center;

color:#14933b;

}



.pie{

text-align:center;

padding:20px;

background:#fffafa;

}



.acciones{

display:none;

}



`;


}

}