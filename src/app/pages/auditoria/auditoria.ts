import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuditoriaService } from '../../services/auditoria';



@Component({

  selector:'app-auditoria',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./auditoria.html',

  styleUrl:'./auditoria.css'

})


export class Auditoria implements OnInit {


  private auditoriaService = inject(AuditoriaService);



  auditorias:any[]=[];


  cargando=true;



  ngOnInit():void{


    this.listarAuditoria();


  }





  listarAuditoria(){


    this.auditoriaService.listar()

    .subscribe({


      next:(respuesta)=>{


        console.log(
          "Auditoría:",
          respuesta
        );


        this.auditorias = respuesta.data;


        this.cargando=false;


      },


      error:(error)=>{


        console.error(error);


        this.cargando=false;


      }


    });


  }



}