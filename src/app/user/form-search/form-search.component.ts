import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, take, takeUntil } from 'rxjs/operators'
import { IAppState } from '../../+store';
import { IUserSearchForm } from '../shared/interface/userSearchForm';
import * as userAction from '../+store/user/user.action'
import { IUser } from '../shared/interface/user';
import { UserService } from '../../user/shared/service/user.service'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {Moment} from 'moment'

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormSearchComponent implements OnInit, OnDestroy {
  @ViewChild('selectUsernameInput') selectUsernameInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: string[] = ['Lemon'];
  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.selectUsernameInput.nativeElement.value = '';

    this.fc.usernames.setValue(null);
    // this.selectUsernameInput.setValue(null);
  }


  remove(fruit: string | undefined): void {
    const index = this.fruits.indexOf(fruit || '');

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  form!: FormGroup;
  killSubscribtion = new Subject();
  displayFn = (): string => '';
  usernameFilteredData!: Subject<IUser[] | null>;
  selectedUsernameFilterData: Map<number, Partial<IUser>> = new Map();
  selectedUsernameFilterDataHtml = new BehaviorSubject<Partial<IUser>[] | null>(null)
  //selectedUsernameFilterData:Array<IUser>=[];


  constructor(private fb: FormBuilder, private store: Store<IAppState>, private userSrv: UserService) {
    this.usernameFilteredData = new BehaviorSubject<IUser[] | null>(null);
  }


  get fc(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.doBuildForm();

    this.doAttachSubscribe();

  }

  doAttachSubscribe():void {
    this.fc.usernames.valueChanges
      .pipe(takeUntil(this.killSubscribtion))
      .pipe(startWith<string>(''))
      .pipe(debounceTime(300))
      .subscribe(x => {//console.log(x);
        this.userSrv.searchFormUsernameAutocomplete(x)
          .pipe(takeUntil(this.killSubscribtion))
          .subscribe(x => this.usernameFilteredData.next(x))
      })
  }

  doBuildForm():void {
    this.form = this.fb.group({
      name: ['', []],
      usernames: ['', []],
      usernamesSelected: ['', []],
      dateStart:['', []],
      radioSelect:['', []],
    });
  }


  //Chips
  trimStringUsernameChips(data: string | undefined) {
    let showChar = 5;
    return data!.length > showChar ? data!.substring(0, showChar - 1) + '...' : data
  }

  optionClicked(event: any, data: any) {
    event.stopPropagation();
   // this.toggleSelection(data);
  }

  toggleSelection(data: Partial<IUser>) {
    //this.fc.usernames.setValue(null);
    //this.selectUsernameInput.nativeElement.value = '';
    this.selectUsernameInput.nativeElement.focus();
    this.selectUsernameInput.nativeElement.select();

    let id = data!.id == undefined ? 0 : data.id;

    if (id > 0) {

      if (this.selectedUsernameFilterData.has(id)) {

        this.selectedUsernameFilterData.delete(id)

      } else {

        this.selectedUsernameFilterData.set(id, { ...{}, id: data.id, username: data.username });

      }

      this.fc.usernamesSelected.setValue(Array.from(this.selectedUsernameFilterData.values()));

      this.selectedUsernameFilterDataHtml.next(Array.from(this.selectedUsernameFilterData.values()));


    }


  }

  removeChipUsername(data: Partial<IUser>) {

    this.toggleSelection(data);

  }

//Chips - end


//Date
dateClass: MatCalendarCellClassFunction<Moment> = (cellDate, view) => {
  

  //debugger;
  // Only highligh dates inside the month view.
  
  if (view === 'month') {
    const dayOfWeek = cellDate.day();
    //debugger;
    // Highlight the 1st and 20th day of each month.
    return dayOfWeek === 6 || dayOfWeek === 0 ? 'custom-date-class-orange' : '';


  }
  

  return '';
};


//Date - end








  submit(data: IUserSearchForm) {
    if (!this.form.invalid) {
      this.store.dispatch(userAction.searchForm({ payload: data }))
    }
  }

  ngOnDestroy(): void {
    this.killSubscribtion.next();
    this.killSubscribtion.complete();
  }

}


