import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ColorThemeEnum} from '../../constant/globalEnum'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title!: string;
  message!: string;
  onConfirmBurronName!: string;
  onConfirmButtonColorThemeEnum!: ColorThemeEnum;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
      this.title = data.title;
      this.message = data.message;
      this.onConfirmBurronName=data.onConfirmButtonName;
      this.onConfirmButtonColorThemeEnum=data.onConfirmButtonColorThemeEnum;
     }

  ngOnInit(): void {
  }

  @HostListener('keydown', ['$event'])
  onInput(e: any) {
    if (e.which==121) {
      this.onConfirm();
      e.preventDefault();
    }
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }


}

export class ConfirmDialogModel {

  constructor(public title: string, 
    public message: string, 
    public onConfirmButtonName: string, 
    public onConfirmButtonColorThemeEnum:ColorThemeEnum ) {

  }
}
