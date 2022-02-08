import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private httpClient: HttpClient) { }

  loadUsers():Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.url)
  };

  deleteUser(id: number) {
    return this.httpClient.delete(this.url + id)
  };

  editUser(user: IUser) {
    return this.httpClient.patch(this.url + user.id, undefined)
  };
}
