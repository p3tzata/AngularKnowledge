import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
// import { reducers } from './+store/user';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffects } from './+store/user/effects';



@NgModule({
  declarations: [
    UserGridComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    // StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([
      UserListEffects
    ])
  ]
})
export class UserModule { }
