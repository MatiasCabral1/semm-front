import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { DiasNoHabilesService } from 'src/app/service/dias-no-habiles.service';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {
  patentes : any;
  
  constructor(
    private tokenService: TokenService,
    private diasNoHabiles: DiasNoHabilesService
  ){}

  ngOnInit(): void {
    this.refreshSession();
   
  } 
  public refreshSession(){
    console.log("username",this.tokenService.getUserName());
    let username = this.tokenService.getUserName()!;
    this.tokenService.setUserName(username);
  }

  public probarJson(){
    let data = {
      "fecha":[
         "1 de Enero Sábado",
         "28 de Febrero Lunes",
         "1 de Marzo Martes",
         "24 de Marzo Jueves",
         "2 de Abril Sábado",
         "15 de Abril Viernes",
         "1 de Mayo Domingo",
         "25 de Mayo Miércoles",
         "20 de Junio Lunes",
         "9 de Julio Sábado",
         "8 de Diciembre Jueves",
         "25 de Diciembre Domingo",
         "17 de Junio Viernes",
         "15 de Agosto Lunes",
         "10 de Octubre Lunes",
         "20 de Noviembre Domingo",
         "7 de Octubre Viernes",
         "21 de Noviembre Lunes",
         "9 de Diciembre Viernes"
      ]
   }
   this.diasNoHabiles.saveList(data).subscribe();
  }
}
