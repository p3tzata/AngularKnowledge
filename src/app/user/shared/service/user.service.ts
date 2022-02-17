import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Update, UpdateNum } from '@ngrx/entity/src/models';
import { Observable, of, throwError } from 'rxjs';
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

  

  getSingle(id: number):Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.url}\\${id}`).pipe(delay(1000))
  };


  deleteUser(id: number) {
    return this.httpClient.delete(this.url + id).pipe(delay(1000))
  };

  editUser(user: IUser) {
    //Fake call to API
    //Simulate error return this.httpClient.get<IUser>(`${this.url}\\sdfsdfsd`).pipe(delay(1000))
    return of(user).pipe(delay(1000)) ;  
  };


  editInline(users: IUser[]):Observable<IUser[]> {
    //Fake call to API
    return  of(users).pipe(delay(1000));
  }


}


