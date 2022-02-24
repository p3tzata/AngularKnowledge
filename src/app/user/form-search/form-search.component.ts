import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import {debounceTime, map, startWith, take, takeUntil} from 'rxjs/operators'
import { IAppState } from '../../+store';
import { IUserSearchForm } from '../shared/interface/userSearchForm';
import * as userAction from '../+store/user/user.action'
import { IUser } from '../shared/interface/user';
import {UserService} from '../../user/shared/service/user.service'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit,OnDestroy {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: string[] = ['Lemon'];
  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
   // this.fruitInput.nativeElement.value = '';
  //  this.fruitCtrl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    //event.chipInput!.clear();

    this.fc.usernames.setValue(null);
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
  usernameFilteredData!:Subject<IUser[] | null>;
  selectedUsernameFilterData:Map<number,Partial<IUser>>=new Map();
  selectedUsernameFilterDataHtml=new BehaviorSubject<Partial<IUser>[] | null>(null)
  //selectedUsernameFilterData:Array<IUser>=[];


  constructor(private fb: FormBuilder,private store: Store<IAppState>,private userSrv: UserService) {
    this.usernameFilteredData=new BehaviorSubject<IUser[] | null>(null);
   }


  get fc():{[key: string]: AbstractControl;} {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', []],
      usernames: ['', []],
      usernamesSelected:['', []]
    });

    this.fc.usernames.valueChanges
    .pipe(takeUntil(this.killSubscribtion))
    .pipe(startWith<string>(''))
    .pipe(debounceTime(300))
    .subscribe(x=>
      this.userSrv.searchFormUsernameAutocomplete(x)
      .pipe(takeUntil(this.killSubscribtion))
      .subscribe(x=>this.usernameFilteredData.next(x))    
    )

  }

 

  optionClicked($event: any, data:any){

  }

  toggleSelection(data: Partial<IUser>) {
    
    let id = data!.id==undefined ? 0 : data.id; 

    if(id>0) {

        if(this.selectedUsernameFilterData.has(id) ) {
          
          this.selectedUsernameFilterData.delete(id)

        } else {

          this.selectedUsernameFilterData.set(id,{...{},id: data.id,username: data.username});

        }
        
        this.fc.usernamesSelected.setValue(Array.from(this.selectedUsernameFilterData.values()));

        this.selectedUsernameFilterDataHtml.next(Array.from(this.selectedUsernameFilterData.values()));


  }

    
  }

  removeChipUsername(data: Partial<IUser>){
    
      this.toggleSelection(data);
    
  }



  submit(data: IUserSearchForm) {
    if (!this.form.invalid) {
      this.store.dispatch(userAction.searchForm({payload: data}))
    }
  }

  ngOnDestroy(): void {
    this.killSubscribtion.next();
    this.killSubscribtion.complete();
  }

}


