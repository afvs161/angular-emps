import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Emp } from 'src/app/Model';

@Injectable({
  providedIn: 'root',
})
export class EmpDataService {
  private empListSubject: BehaviorSubject<Emp[]> = new BehaviorSubject<Emp[]>(
    []
  );

  setEmpList(empList: Emp[]): void {
    this.empListSubject.next(empList);
  }

  getEmpList(): Observable<Emp[]> {
    return this.empListSubject.asObservable();
  }
}
