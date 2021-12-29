import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/Material/icon';
import { MatCardModule } from '@angular/Material/card';



@NgModule({
  declarations: [],
  exports:[MatIconModule, MatCardModule],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
