import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Update, UpdateNum } from '@ngrx/entity/src/models';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators'
import { IUser } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private httpClient: HttpClient) { }

  loadUsers():Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.url).pipe(delay(1000))
  };

  deleteUser(id: number) {
    return this.httpClient.delete(this.url + id)
  };

  editUser(user: IUser) {
    //Fake call to API
    //return this.httpClient.patch(this.url + user.id, undefined)
    return of (user)
  };


  editInline(users: IUser[]):Observable<IUser[]> {
    //Fake call to API
    return  of(users).pipe(delay(1000));
  }


}


