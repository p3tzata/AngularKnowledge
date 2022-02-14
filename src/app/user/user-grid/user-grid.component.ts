import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as userAction from '../+store/user/user.action';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';
import { IUser } from '../shared/interface/user';
import { takeUntil } from 'rxjs/operators'
import { SelectionModel } from '@angular/cdk/collections';
import {IAppState} from '../../+store/'
import * as userSelector from '../+store/user/user.selector'

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['checkbox', 'name', 'username', 'email', 'input', 'active', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IUser>();
  dataFromDialog: any;
  selection = new SelectionModel<IUser>(true, []);

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  killSubscribtion = new Subject();



  constructor(private _liveAnnouncer: LiveAnnouncer,
    private store: Store<IAppState>,
    private dialog: MatDialog
    ) {  }



    ngOnInit(): void {

      this.store.dispatch(userAction.load());
      this.store.select((x)=>userSelector.selectAll(x.userModule!.userEntity) ).pipe(takeUntil(this.killSubscribtion)).subscribe(users => { 
      this.dataSource = new MatTableDataSource<IUser>(users!);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
    }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  checkIsActive(id: number): boolean {
    return true;
  };

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        id: id,
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
  };

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
// 9:15 - 10:45 bind user to edit modal dialog
  edit(user: IUser): void {
    const dialogRef = this.dialog.open(EditDialogComponent,
      {
        data: {
          width: '550px',
          height: '550px',
          user: user,
        }
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      this.dataFromDialog = data.form;
      if (data.clicked === 'submit') {
        console.log('Sumbit button clicked')
      }
    });
  };

  ngOnDestroy(): void {
    this.killSubscribtion.next();
    this.killSubscribtion.complete();
  }

}
