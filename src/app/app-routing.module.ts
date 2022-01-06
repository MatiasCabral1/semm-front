import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { LoginGuard } from './guards/login.guard';
import { ProdGuardService } from './guards/prod-guard.service';
import { CuentaComponent } from './pages/sesion/cuenta/cuenta.component';
import { PatentesComponent } from './pages/sesion/patentes/patentes.component';
import { RegistrarPatenteComponent } from './pages/sesion/patentes/registrar-patente/registrar-patente.component';

const routes: Routes = [
 { path: 'sesion', loadChildren: () => import('./pages/sesion/sesion.module').then(m => m.SesionModule) , canActivate: [ProdGuardService]},
 {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
 {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
 {path: 'listadoPatentes', component: PatentesComponent, canActivate: [ProdGuardService]},
 {path: 'miCuenta', component: CuentaComponent, canActivate: [ProdGuardService]},
 {path: 'registrarPatente', component: RegistrarPatenteComponent, canActivate: [ProdGuardService]},
 { path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
