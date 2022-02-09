import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserListEffects } from './+store/user/user.effects';
import { reducers } from './+store';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './dialog/edit-dialog/edit-dialog.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserGridComponent,
    DeleteDialogComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('userModule', reducers),
    EffectsModule.forFeature([
      UserListEffects
    ])
  ]
})
export class UserModule { }
