import { Component, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { editUser } from '../../+store/user/user.action';
import { IUser } from '../../shared/interface/user';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  form: FormGroup;
  user: IUser;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) { 
    this.user = data.user;
    this.form = this.fb.group({
      name: ['', Validators.required ],
      username: ['', Validators.required, Validators.minLength(3)],
      email: ['', Validators.required, Validators.minLength(3)],
      product: ['']
    });
  }


  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form
    });
    this.user.name!= form.name;
    this.store.dispatch(editUser(this.user))
  }

}
