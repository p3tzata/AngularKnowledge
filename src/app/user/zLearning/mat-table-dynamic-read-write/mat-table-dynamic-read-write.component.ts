import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../+store';
import * as globalSelector from '../../../+store/selector'
import { IUser } from '../../shared/interface/user';
import * as userSelector from '../../+store/user/user.selector'
import * as userAction from '../../+store/user/user.action';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-mat-table-dynamic-read-write',
  templateUrl: './mat-table-dynamic-read-write.component.html',
  styleUrls: ['./mat-table-dynamic-read-write.component.css']
})
export class MatTableDynamicReadWriteComponent implements OnInit {

  selection = new SelectionModel<IUser>(true, []);
  tabIndex=1;
  maxTabIndexOffset=200000;
  dataSource!: MatTableDataSource<IUser>;
  dataSchema:{[key:string]: string};
  tabIndexSchema:{[key:string]: number};
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  spinner$!:Observable<boolean>;
  killSubscribtion = new Subject();
  displayedColumnsLoop = ["id","username","name", "email"];
  displayedColumns = ["checkbox","id","username","name", "email"];
  
  TABLE_SCHEMA = {
    //"id": "number",
    "username": "text",
    "name" : "text",
    "email": "text",
  }
  
  TABINDEX_SCHEMA = {
    "username": 0,
    "name":  100000,
    "email": 200000,
  }


  inlineEdited:{[key:number] : Partial<IUser> }={};


  constructor(private store: Store<IAppState>) { 
    
    this.dataSchema=this.TABLE_SCHEMA;
    this.tabIndexSchema=this.TABINDEX_SCHEMA;

  }

  ngOnInit(): void {
    
    this.spinner$=this.store.select((x)=>{ return globalSelector.spinnerSelector(x)});
    let dataSourceInner:MatTableDataSource<IUser>;
    this.store.dispatch(userAction.load());
    this.store.select((x)=>userSelector.selectAll(x.userModule!.userEntity) ).pipe(takeUntil(this.killSubscribtion)).subscribe(users => { 
      const usersColne = [...users]
    this.dataSource = new MatTableDataSource<IUser>(Array.from(users));
    //this.dataSource = new MatTableDataSource<IUser>([{id:1,email:"tttt",username:"tttt",isActive:false,name:"sss"}]);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    });
    


  }

  setInline(id:number, defaultRowValue:IUser, targetProp:any ,targetValue: any) {
    if (!this.inlineEdited[id]) {
      this.inlineEdited[id]=defaultRowValue;
      //this.inlineEdited[id]={id};
    }
    this.inlineEdited[id] = {...this.inlineEdited[id],[targetProp]:targetValue }

    //console.log(id,{[col]:event});

   // console.log(this.inlineEdited);
  //  console.log(this.inlineEdited[id])


  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  doSelect($event: any, element :any ) {
    //console.log($event)
    
    if ($event instanceof KeyboardEvent) {
      if ($event.key!="Tab" 
          && $event.key!="Escape"
          && $event.key!="F2"
          && $event.key!="Enter"
          && $event.key!="ArrowRight" 
          && $event.key!="ArrowLeft" 
          && $event.key!="ArrowDown"
          && $event.key!="ArrowUp") {
        this.selection.select(element)
      }
    }
     
  }

  getTabIndex():number {
    console.log('tabindex')
    return this.tabIndex++;
  }

  updateRow(){
    for (let item of this.selection.selected) {
      let id=item.id
      if(this.inlineEdited[id]) {
        console.log(this.inlineEdited[id]);
      }
      
      
    }
  }


}
