import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { LoginGuard } from './guards/login.guard';
import { ProdGuardService } from './guards/prod-guard.service';
import { AccountComponent } from './pages/sesion/cuenta/account.component';
import { HistoryComponent } from './pages/sesion/historial/history.component';
import { PatentsComponent } from './pages/sesion/patentes/list-patents/patents.component';
import { RegisterPatentComponent } from './pages/sesion/patentes/registrar-patente/register-patent.component';

const routes: Routes = [
 { path: 'sesion', loadChildren: () => import('./pages/sesion/index/sesion.module').then(m => m.SesionModule) , canActivate: [ProdGuardService]},
 {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
 {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
 {path: 'listPatents', component: PatentsComponent, canActivate: [ProdGuardService]},
 {path: 'myAccount', component: AccountComponent, canActivate: [ProdGuardService]},
 {path: 'registerPatent', component: RegisterPatentComponent, canActivate: [ProdGuardService]},
 {path: 'history', component: HistoryComponent, canActivate: [ProdGuardService]},
 { path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
