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

 
}
