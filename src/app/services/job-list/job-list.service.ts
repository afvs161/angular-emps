import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from 'src/app/Model';
import { environment } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class JobListService {
  private jobSubjectList: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(
    []
  );

  constructor(private http: HttpClient) {
    this.fetchJobList();
  }

  fetchJobList(): void {
    this.http
      .get<Job[]>(`${environment.BASE_URL}/jobs`)
      .subscribe((data: Job[]) => this.jobSubjectList.next(data));
  }

  updateJobList(updatedData: Job[]) {
    this.jobSubjectList.next(updatedData);
  }

  getJobList(): Observable<Job[]> {
    return this.jobSubjectList.asObservable();
  }
}
