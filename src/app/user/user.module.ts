import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserListEffects } from './+store/user/user.effects';
import { reducers } from './+store';

import { EditDialogComponent } from './dialog/edit-dialog/edit-dialog.component';

import { MatTableDynamicReadWriteComponent } from './mat-table-dynamic-read-write/mat-table-dynamic-read-write.component';
import {DirectiveModule} from '../core/shared/directive/directive.module';
import { NewDialogComponent } from './dialog/new-dialog/new-dialog.component';
import { IndexComponent } from './index/index.component';
import { FormSearchComponent } from './form-search/form-search.component';
import { MatTableSlaveComponent } from './mat-table-slave/mat-table-slave.component';





@NgModule({
  declarations: [
    EditDialogComponent,
    MatTableDynamicReadWriteComponent,
    NewDialogComponent,
    IndexComponent,
    FormSearchComponent,
    MatTableSlaveComponent,
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
