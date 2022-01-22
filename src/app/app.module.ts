import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SesionComponent } from './pages/sesion/index/sesion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './pages/sesion/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { PatentsComponent } from './pages/sesion/patentes/list-patents/patents.component';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {AuthInterceptorServiceProvider } from './interceptors/auth-interceptor.service';
import { AccountComponent } from './pages/sesion/cuenta/account.component';
import { HistoryComponent } from './pages/sesion/historial/history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPatentComponent } from './pages/sesion/patentes/edit-patent/edit-patent.component';
import { RegisterPatentComponent } from './pages/sesion/patentes/registrar-patente/register-patent.component';

@NgModule({
  declarations: [
    AppComponent,
    SesionComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    PatentsComponent,
    RegisterPatentComponent,
    AccountComponent,
    HistoryComponent,
    EditPatentComponent
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
