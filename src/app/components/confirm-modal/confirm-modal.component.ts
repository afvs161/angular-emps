import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Emp, ModalObj } from 'src/app/Model';
import { EmpListService } from 'src/app/services/emp-list/emp-list.service';
import { HttpService } from 'src/app/services/http/http.service';
import { JobListService } from 'src/app/services/job-list/job-list.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  mo: ModalObj = {
    number: 2,
    alert: '',
    msg: '',
    isVisible: false,
    action: '',
  };

  constructor(
    private modalService: ModalService,
    private router: Router,
    private http: HttpService,
    private empListService: EmpListService,
    private jobListService: JobListService
  ) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((obj: ModalObj) => (this.mo = obj));
  }
  handleOk() {
    switch (this.mo.action) {
      case 'LOG_OUT': {
        this.router.navigate(['login']);
        localStorage.removeItem('user');
        this.modalService.handleCancel();
      }

      case 'DELETE_EMP': {
        this.http.deleteEmp(this.mo.obj).subscribe(
          (arr: Emp[]) => {
            this.empListService.updateEmpList(arr);
            this.handleCancel();
            this.modalService.showModal(
              1,
              'Success',
              'Employee details was successfully removed!'
            );
          },
          (error) => {
            this.handleCancel();
            this.modalService.showModal(
              1,
              'Error',
              'Employee details could not be removed!'
            );
            console.log(error);
          }
        );
      }

      case 'DELETE_JOB': {
        this.http.deleteJob(this.mo.jobObj).subscribe(
          (arr) => {
            this.jobListService.updateJobList(arr);
            this.modalService.showModal(
              1,
              'Success',
              'Job was successfully removed!'
            );
          },
          (err) => {
            console.log(err);
            this.modalService.showModal(
              1,
              'Error',
              'Job could not be removed!'
            );
          }
        );
      }

      default: {
        this.handleCancel();
      }
    }
  }

  handleCancel() {
    this.modalService.handleCancel();
  }
}
