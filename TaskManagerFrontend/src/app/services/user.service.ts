import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>('/api/users');
  }

  addUser(userObj) {
    return this.http.post<any>('/api/user', userObj, httpOptions);
  }

  editUser(id, userObj) {
    return this.http.put<any>('/api/user/' + id, userObj, httpOptions);
  }

  deleteUser(id) {
    return this.http.delete<any>('/api/user/' + id);
  }
}
