import { Component, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required ],
      username: ['', Validators.required, Validators.minLength(3)],
      country: ['']
    });
  }


  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form
    });
  }

}
