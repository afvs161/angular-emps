import { Component, OnInit } from '@angular/core';
import { Job, NewJob } from 'src/app/Model';
import { HttpService } from 'src/app/services/http/http.service';
import { JobListService } from 'src/app/services/job-list/job-list.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  exp: number;

  constructor(
    private jobListService: JobListService,
    private modalService: ModalService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.jobListService
      .getJobList()
      .subscribe((data: Job[]) => (this.jobs = data));
  }

  expand(id: number) {
    if (this.exp === id) {
      this.exp = 0;
    } else {
      this.exp = id;
    }
  }

  addNewJob() {
    this.modalService.showModal(4, 'New Job', '', 'ADD_JOB');
  }

  deleteJob(obj: Job) {
    this.modalService.showModal(
      2,
      'Deleting job',
      'Do you really want to remove job?',
      'DELETE_JOB',
      {},
      obj
    );
  }

  updateJob(obj: Job) {
    this.modalService.showModal(4, 'Change Job Details', '', 'UPDATE_JOB', {}, obj)
  }
}
