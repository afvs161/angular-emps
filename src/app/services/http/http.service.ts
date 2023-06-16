import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environment/env';
import { Emp, EmpTable, Job } from '../../Model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getJobList(): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.BASE_URL}/jobs`);
  }

  addNewEmp(obj: Emp) {
    return this.http
      .post<Emp>(`${environment.BASE_URL}/emps`, obj, httpOptions)
      .pipe(
        switchMap(() => this.http.get<Emp[]>(`${environment.BASE_URL}/emps`))
      );
  }

  deleteEmp(obj: EmpTable): Observable<Emp[]> {
    const url = `${environment.BASE_URL}/emps/${obj.id}`;
    return this.http
      .delete(url)
      .pipe(
        switchMap(() => this.http.get<Emp[]>(`${environment.BASE_URL}/emps`))
      );
  }

  updateEmp(obj: Emp): Observable<Emp[]> {
    const url = `${environment.BASE_URL}/emps/${obj.id}`;
    return this.http
      .put<Emp>(url, obj, httpOptions)
      .pipe(
        switchMap(() => this.http.get<Emp[]>(`${environment.BASE_URL}/emps`))
      );
  }

  addNewJob(obj: Job) {
    return this.http
      .post<Job>(`${environment.BASE_URL}/jobs`, obj, httpOptions)
      .pipe(
        switchMap(() => this.http.get<Job[]>(`${environment.BASE_URL}/jobs`))
      );
  }

  deleteJob(obj: Job): Observable<Job[]> {
    const url = `${environment.BASE_URL}/jobs/${obj.id}`;
    return this.http
      .delete(url)
      .pipe(
        switchMap(() => this.http.get<Job[]>(`${environment.BASE_URL}/jobs`))
      );
  }
}
