import { Component, Inject } from '@angular/core';
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
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      username: [this.user.username, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.minLength(3), Validators.email]],
      product: ['']
    });
  }


  submit(form: NgForm) {
    if (this.form.valid) {
      this.dialogRef.close({
        clicked: 'submit',
        form: form
      });

    //edit user with parameters from interface
      const updatedUser: IUser = {
        id: this.user.id,
        isActive: this.user.isActive as boolean,
        name: this.form.controls['name'].value as string,
        username: this.form.controls['username'].value as string,
        email: this.form.controls['email'].value as string,
      }
      debugger;
      this.store.dispatch(editUser({ user: updatedUser }))
    }
  }

}
