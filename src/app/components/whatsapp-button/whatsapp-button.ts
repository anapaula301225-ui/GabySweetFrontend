import { Component } from '@angular/core';

@Component({

  selector: 'app-whatsapp-button',

  standalone: true,

  templateUrl: './whatsapp-button.html',

  styleUrls: ['./whatsapp-button.css']

})
export class WhatsappButton {


  numero = "51955997913";


 mensaje =
"Hola GabySweet, quisiera información sobre sus productos.";



  abrirWhatsapp(){


    const url =

    `https://wa.me/${this.numero}?text=${encodeURIComponent(this.mensaje)}`;


    window.open(url, '_blank');


  }


}