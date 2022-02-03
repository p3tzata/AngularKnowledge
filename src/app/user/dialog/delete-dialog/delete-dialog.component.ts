import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteUser } from '../../+store/user/user.action';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private store: Store) {


    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }
  onConfirmClick(): void {
    const name: string = this.data.name;
    this.store.dispatch(deleteUser({ name }));
    this.dialogRef.close(true);
  }

}
