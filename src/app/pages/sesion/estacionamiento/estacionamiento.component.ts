import { Component, HostListener, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { estacionamientoService } from 'src/app/service/estacionamiento.service';

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.component.html',
  styleUrls: ['./estacionamiento.component.scss']
})
export class EstacionamientoComponent implements OnInit {

  constructor(private estacionamientoService: estacionamientoService) {}

  ngOnInit(): void {} 
}
