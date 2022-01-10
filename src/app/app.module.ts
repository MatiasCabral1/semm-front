import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SesionComponent } from './pages/sesion/sesion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './pages/sesion/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { PatentesComponent } from './pages/sesion/patentes/patentes.component';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {AuthInterceptorServiceProvider } from './interceptors/auth-interceptor.service';
import { RegistrarPatenteComponent } from './pages/sesion/patentes/registrar-patente/registrar-patente.component';
import { CuentaComponent } from './pages/sesion/cuenta/cuenta.component';
import { HistorialComponent } from './pages/sesion/historial/historial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SesionComponent,
    NavBarComponent,
    LoginComponent,
    RegistroComponent,
    PatentesComponent,
    RegistrarPatenteComponent,
    CuentaComponent,
    HistorialComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
 
  ],
  providers: [AuthInterceptorServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
