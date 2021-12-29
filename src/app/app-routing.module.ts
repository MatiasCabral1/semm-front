import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { EstacionamientoComponent } from './pages/sesion/estacionamiento/estacionamiento.component';
import { PatentesComponent } from './pages/sesion/patentes/patentes.component';
import { RegistrarPatenteComponent } from './pages/sesion/patentes/registrar-patente/registrar-patente.component';

const routes: Routes = [
  { path: 'index', loadChildren: () => import('./pages/index/index.module').then(m => m.indexModule) },
 { path: 'sesion', loadChildren: () => import('./pages/sesion/sesion.module').then(m => m.SesionModule) },
 {path: 'login', component: LoginComponent},
 {path: 'registro', component: RegistroComponent},
 {path: 'listadoPatentes', component: PatentesComponent},
 {path: 'registrarPatente', component: RegistrarPatenteComponent},
 {path: 'estacionamiento', component: EstacionamientoComponent},
 { path: '**', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
