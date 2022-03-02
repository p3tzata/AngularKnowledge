import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../+store';
import * as globalSelector from '../../+store/selector'
import { IPost, IUser } from '../shared/interface';
import * as postSelector from '../+store/post/post.selector'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mat-table-slave',
  templateUrl: './mat-table-slave.component.html',
  styleUrls: ['./mat-table-slave.component.css']
})
export class MatTableSlaveComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IPost>;
  killSubscribtion = new Subject();
  displayedColumns = ['id','title'];

  constructor(private _liveAnnouncer: LiveAnnouncer,private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.select((x) => postSelector.selectAll(x.userModule!.postEntity)).pipe(takeUntil(this.killSubscribtion)).subscribe(x => {
      this.dataSource = new MatTableDataSource<IPost>(Array.from(x));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //Sort_
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  //Sort_ - end

}
