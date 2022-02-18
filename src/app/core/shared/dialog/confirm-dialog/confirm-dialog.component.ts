import { Component, EventEmitter, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../+store';
import {ColorThemeEnum} from '../../constant/globalEnum'
import * as globalSelector from '../../../../+store/selector'

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
  onConfirmEmitter = new EventEmitter();
  spinner$!:Observable<boolean>;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    private store: Store<IAppState>) {
      this.title = data.title;
      this.message = data.message;
      this.onConfirmBurronName=data.onConfirmButtonName;
      this.onConfirmButtonColorThemeEnum=data.onConfirmButtonColorThemeEnum;
     }

  ngOnInit(): void {
    this.spinner$=this.store.select((x)=>{ return globalSelector.spinnerSelector(x)});
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
    //this.dialogRef.close(true);
    //this.dialogRef.keydownEvents
    this.onConfirmEmitter.emit();
    
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
