import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Update, UpdateNum } from '@ngrx/entity/src/models';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators'
import { IUser, IPost } from '../interface/';

import { IUserSearchForm } from '../interface/userSearchForm';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  simulateDelaySec: number = 200;
  urlUsers: string = 'https://jsonplaceholder.typicode.com/users/';
  urlPosts: string = 'https://jsonplaceholder.typicode.com/posts/'
  constructor(private httpClient: HttpClient) { }

  loadUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.urlUsers).pipe(delay(this.simulateDelaySec))
  };

  loadPostByUserId(id: number): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(this.urlPosts)
      .pipe(map((x) => x.filter(el => el.userId == id)))
      .pipe(delay(this.simulateDelaySec))
  };



  searchForm(data: IUserSearchForm): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.urlUsers).pipe(map(x => x.filter(x => x.name.toLowerCase().includes(data.name.toLowerCase())))).pipe(delay(this.simulateDelaySec))
  };

  searchFormUsernameAutocomplete(data: string): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.urlUsers).pipe(map(x => x.filter(x => x.username.toLowerCase().includes(data.toLowerCase())))).pipe(delay(this.simulateDelaySec - this.simulateDelaySec))
  };

  getSingle(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.urlUsers}\\${id}`).pipe(delay(this.simulateDelaySec))
  };


  deleteUser(id: number) {
    return this.httpClient.delete(this.urlUsers + id).pipe(delay(this.simulateDelaySec))
  };

  editUser(user: IUser) {
    //Fake call to API
    //Simulate error return this.httpClient.get<IUser>(`${this.urlUsers}\\sdfsdfsd`).pipe(delay(this.simulateDelaySec))
    return of(user).pipe(delay(this.simulateDelaySec));
  };


  editInline(users: IUser[]): Observable<IUser[]> {
    //Fake call to API
    return of(users).pipe(delay(this.simulateDelaySec));
  }

  getNeededDataForNewRow(): Observable<boolean> {
    return of(true).pipe(delay(this.simulateDelaySec))
  }

  new_(entity: IUser): Observable<IUser> {

    let randomId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    let user = { ...entity, id: randomId }

    return of(user).pipe(delay(this.simulateDelaySec))

  }


  getDataForEditDialog(id: number): Observable<any> {

    return forkJoin({
      entity: this.getSingle(id),
      cities: this.getCitiesForDropDownMenu()
    });

  }


  getCitiesForDropDownMenu(): Observable<{ [key: number]: string }> {
    let cities: { [key: number]: string } = {};

    cities[1] = "Sofia";
    cities[2] = "Plovdiv"

    return of(cities).pipe(delay(this.simulateDelaySec + 200))
  }



}


