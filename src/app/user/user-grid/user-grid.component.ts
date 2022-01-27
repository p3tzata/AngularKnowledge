import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUsers, } from '../+store/user/action';
import { IUser } from '../shared/interface/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {

  users$:Observable<IUser[]> ;
  

  displayedColumns: string[] = ['name', 'username', 'email', 'active', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IUser>();

  constructor(private _liveAnnouncer: LiveAnnouncer, userService: UserService,
    private store: Store<any>) {
    this.users$ = userService.loadUsers();

    //debugger;
  }
  ngOnInit(): void {
    this.users$.subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
    });

    this.store.dispatch(loadUsers())

  }

  @ViewChild(MatSort) sort!: MatSort;

  public doFilter = (value: string) => {
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  announceSortChange(sortState: Sort) {
    
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteUserHandler(name: string) {
    this.users$.pipe().subscribe()
  }
}
