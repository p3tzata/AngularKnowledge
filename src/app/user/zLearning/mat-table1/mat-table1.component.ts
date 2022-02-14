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
  selector: 'app-mat-table1',
  templateUrl: './mat-table1.component.html',
  styleUrls: ['./mat-table1.component.css']
})
export class MatTable1Component implements OnInit,AfterViewInit,OnDestroy {

//https://blog.angular-university.io/angular-material-data-table/
displayedColumns = ["seqNo", "description", "email"];
dataSource = new MatTableDataSource<IUser>();
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild('searchInput') searchInput!: ElementRef;

spinner$!:Observable<boolean>;
killSubscribtion = new Subject();


  constructor(private store: Store<IAppState>) { }
 

  ngOnInit(): void {
    this.spinner$=this.store.select((x)=>{ return globalSelector.spinnerSelector(x)});
    
    this.store.dispatch(userAction.load());
    this.store.select((x)=>userSelector.selectAll(x.userModule!.userEntity) ).pipe(takeUntil(this.killSubscribtion)).subscribe(users => { 
    this.dataSource = new MatTableDataSource<IUser>(users!);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                  console.log(this.searchInput.nativeElement.value);
                })
            )
            .subscribe();
  }

  ngOnDestroy(): void {
    this.killSubscribtion.next();
    this.killSubscribtion.complete();
  }

  onRowClicked(row: IUser) {
    console.log('Row clicked with userId: ', row.id);
  }



}
