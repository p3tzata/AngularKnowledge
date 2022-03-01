import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as userAction from '../+store/user/user.action'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  selected = 0;
  killSubscription = new Subject();
  constructor(private actions$: Actions) { }


  ngOnInit(): void {

    this.actions$
      .pipe(takeUntil(this.killSubscription), ofType(userAction.оpenLinesТabSignal))
      .subscribe((x) => {
        this.selected = 1;
      });

  }

  setSelected(idToSelect: number) {
        this.selected = idToSelect;
  }

  getSelected() {
    return this.selected;
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete;
  }

}
