import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static loadUsers(): any {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }

  loadUsers() {
    return this.httpClient.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
  }
}
