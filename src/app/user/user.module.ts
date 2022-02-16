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
import { MatTable1Component } from './zLearning/mat-table1/mat-table1.component';
import { MatTableDynamicReadWriteComponent } from './zLearning/mat-table-dynamic-read-write/mat-table-dynamic-read-write.component';
import {DirectiveModule} from '../core/shared/directive/directive.module'




@NgModule({
  declarations: [
    UserGridComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    MatTable1Component,
    MatTableDynamicReadWriteComponent,
  ],
  imports: [
    DirectiveModule,
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
