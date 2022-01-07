import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { PatenteService } from 'src/app/service/patente.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent implements OnInit {
  patentes : any;
  
  constructor(){}

  ngOnInit(): void {

  } 

}
