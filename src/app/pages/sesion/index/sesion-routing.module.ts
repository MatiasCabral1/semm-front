import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdGuardService } from 'src/app/guards/prod-guard.service';
import { SesionComponent } from './sesion.component';

const routes: Routes = [
  { path: '', component: SesionComponent, canActivate: [ProdGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionRoutingModule {}
