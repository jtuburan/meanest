import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _studentInfo = new Subject<UserModel[]>();
  _studentInfo$ = this._studentInfo.asObservable();
  private _getUrl = "http://localhost:3000/api"

  constructor(private _http: HttpClient) { }

  addUserInfo(user: UserModel): Observable<UserModel> {
    // this._studentInfo.next(student);
    // console.log(student);
    return this._http.post<UserModel>(`${this._getUrl}/post`, user);
  }

  getUser(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(`${this._getUrl}/users`);
  }

  deleteUser(id: string): Observable<{}>{
    const url = `${this._getUrl}/delete/${id}`;
    return this._http.delete(url)
  }
}
