import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { loadUsers, } from '../+store/user/user.action';
import { selectUserListUsers } from '../+store/user/user.selector';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';
import { IUser } from '../shared/interface/user';
import { UserService } from '../shared/service/user.service';
import {takeUntil} from 'rxjs/operators'


@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit, AfterViewInit,OnDestroy {

  displayedColumns: string[] = ['checkbox', 'name', 'username', 'email', 'input', 'active', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IUser>();
  isActive!: boolean;
  dataFromDialog: any;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  killSubscribtion= new Subject();

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private store: Store<any>,
    private dialog: MatDialog
  ) { }
  

  ngOnInit(): void {

    this.store.dispatch(loadUsers());
    this.store.select(selectUserListUsers).pipe(takeUntil(this.killSubscribtion)).subscribe(users => {
      this.dataSource = new MatTableDataSource<IUser>(users!);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  deleteUserHandler(id: number) {
    this.userService.deleteUser(id)
  };

  checkIsActive(): boolean {
    return this.isActive = true;
  };

  openDialog(name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        name: name,
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
  };

  edit(): void {
    const dialogRef = this.dialog.open(EditDialogComponent,
      { width: '550px', height: '550px' });

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
