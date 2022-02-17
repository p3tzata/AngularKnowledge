import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as userAction from '../../+store/user/user.action'
import { IUser } from '../../shared/interface/user';
import * as globalSelector from '../../../+store/selector'
import { IAppState } from '../../../+store';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  spinner$!:Observable<boolean>;
  form: FormGroup;
  user: IUser;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) {
    this.user = data.user;
    this.form = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      username: [this.user.username, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.minLength(3), Validators.email]],
    });
  }
  ngOnInit(): void {
    this.spinner$=this.store.select((x)=>{ return globalSelector.spinnerSelector(x)});
    

  }


  submit(data: IUser) {
   
    if (this.form.valid) {
      /*
      this.dialogRef.close({
        clicked: 'submit',
        form: form
      });
      */
      
  let user:IUser = {...data, id: this.user.id }
   
      this.store.dispatch( userAction.edit({update: user}))
    
    }
  }

}
