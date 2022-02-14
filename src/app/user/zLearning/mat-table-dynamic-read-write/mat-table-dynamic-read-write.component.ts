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

@Component({
  selector: 'app-mat-table-dynamic-read-write',
  templateUrl: './mat-table-dynamic-read-write.component.html',
  styleUrls: ['./mat-table-dynamic-read-write.component.css']
})
export class MatTableDynamicReadWriteComponent implements OnInit {

  dataSource!: MatTableDataSource<IUser>;
  dataSchema:{[key:string]: string};
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  spinner$!:Observable<boolean>;
  killSubscribtion = new Subject();
  displayedColumns = ["id","username", "email"];
  
  TABLE_SCHEMA = {
    "id": "number",
    "username": "text",
    "email": "text",
  }

  constructor(private store: Store<IAppState>) { 
    
    this.dataSchema=this.TABLE_SCHEMA;

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


}
