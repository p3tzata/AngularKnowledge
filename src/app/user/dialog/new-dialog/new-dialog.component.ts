import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppState } from '../../../+store';

import * as globalSelector from '../../../+store/selector'
import { IUser } from '../../shared/interface/user';
import * as userAction from '../../+store/user/user.action'


@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.css']
})
export class NewDialogComponent implements OnInit {

  spinner$!:Observable<boolean>;
  form: FormGroup;
  nameErrorMsg!:string; usernameErrorMsg!:string; emailErrorMsg!:string;
  killSubscribtion = new Subject();
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) 
    private data: any,
    public dialogRef: MatDialogRef<NewDialogComponent> ) {
      
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      });
      console.log(this.form)
     }

  ngOnInit(): void {

    this.spinner$=this.store.select((x)=>{ return globalSelector.spinnerSelector(x)});
    
  }

  submit(data: IUser) {
   
  this.form.markAllAsTouched()
   
   
   if (this.form.valid) {
      
      this.store.dispatch(userAction.new_({insert: data}))
    
    }
  }

  get fc():{[key: string]: AbstractControl;} {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.killSubscribtion.next();
    this.killSubscribtion.complete();
  }

}
