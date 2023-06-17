import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Userinfo } from 'src/app/Model';
import { environment } from 'src/environment/env';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserinfoService {
  private userinfoSubject = new Subject<Userinfo>();
  userinfo$ = this.userinfoSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserinfo(): Observable<Userinfo> {
    return this.http.get<Userinfo>(`${environment.BASE_URL}/userinfo`);
  }

  setNewUsername(userinfo: Userinfo): Observable<Userinfo> {
    const url = `${environment.BASE_URL}/userinfo`;
    return this.http.put<Userinfo>(url, userinfo, httpOptions);
  }
}
