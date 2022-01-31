import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUsers, } from '../+store/user/action';
import { selectUserListUsers } from '../+store/user/selector';
import { IUser } from '../shared/interface/user';
import { UserService } from '../shared/service/user.service';



@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit, AfterViewInit {  

  displayedColumns: string[] = ['name', 'username', 'email', 'active', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IUser>();
  isActive!: boolean;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private store: Store<any>
    ) {  }

  ngOnInit(): void {

    this.store.dispatch(loadUsers());
    this.store.select(selectUserListUsers).subscribe(users => {
      this.dataSource = new MatTableDataSource(users!);
    });
    debugger;
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

}
