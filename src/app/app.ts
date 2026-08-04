import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Footer,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  private firebaseService = inject(FirebaseService);



  constructor(){


    this.probarFirebase();


  }



  async probarFirebase(){


    const token =
      await this.firebaseService.obtenerToken();


    console.log(
      "TOKEN FCM:",
      token
    );


    this.firebaseService.escucharMensajes();


  }


}
