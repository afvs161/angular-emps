import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Emp } from 'src/app/Model';
import { environment } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class EmpListService {
  private empListSubject: BehaviorSubject<Emp[]> = new BehaviorSubject<Emp[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.fetchEmpList();
  }

  fetchEmpList(): void {
    this.http
      .get<Emp[]>(`${environment.BASE_URL}/emps`)
      .subscribe((data: Emp[]) => this.empListSubject.next(data));
  }

  updateEmpList(updatedData: Emp[]) {
    this.empListSubject.next(updatedData);
  }

  getList(): Observable<Emp[]> {
    return this.empListSubject.asObservable();
  }
}
