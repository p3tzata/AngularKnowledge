import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../+store';
import * as globalAction from '../../../+store/action'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private store:Store<IAppState>) { 



  }

  show():void {
    this.store.dispatch(globalAction.showSpinner());
  }

  showDialog():void {
    this.store.dispatch(globalAction.showDialogSpinner());
  }

  hide():void {
    this.store.dispatch(globalAction.hideSpinner());
  }


}
