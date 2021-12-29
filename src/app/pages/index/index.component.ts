import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class indexComponent implements OnInit {
    isLogged = false;
    nombreUsuario: string | null = '';
  
    constructor(private tokenService: TokenService) { }
  
    ngOnInit() {
      console.log("se inicio el metodo");
      if (this.tokenService.getToken()) {
        this.isLogged = true;
        this.nombreUsuario = this.tokenService.getUserName();
        console.log("se ingreso por el if", this.nombreUsuario);
      } else {
        this.isLogged = false;
        this.nombreUsuario = '';
        console.log("se ingreso por el if", this.tokenService.getUserName);
      }
    }
  
  }