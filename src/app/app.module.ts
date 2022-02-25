import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { ToastrEffect } from './+store/toastr/toastr.effect';
import {global }   from './+store/reducer'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CoreModule,
    
    ReactiveFormsModule,
    StoreModule.forRoot({global}, {}),
    EffectsModule.forRoot([ToastrEffect]),
    StoreDevtoolsModule.instrument({}),
    ToastrModule.forRoot(),
    
    
  ],exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
