import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/interfaces/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements AfterViewInit {

  users$:Observable<IUser[]> ;
  

  displayedColumns: string[] = ['name', 'username', 'email', 'active', 'edit', 'delete'];
  //dataSource = this.users$

  constructor(private _liveAnnouncer: LiveAnnouncer, userService: UserService) {
    this.users$ = userService.loadUsers();

    //debugger;
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
  
  }

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
}
