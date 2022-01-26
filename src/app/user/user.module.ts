import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserGridComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    RouterModule
  ]
})
export class UserModule { }
