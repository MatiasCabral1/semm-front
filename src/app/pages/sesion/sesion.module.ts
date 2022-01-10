import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionRoutingModule } from './sesion-routing.module';
import { RegistrarPatenteComponent } from './patentes/registrar-patente/registrar-patente.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HistorialComponent } from './historial/historial.component';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SesionRoutingModule
  ]
})
export class SesionModule { }
