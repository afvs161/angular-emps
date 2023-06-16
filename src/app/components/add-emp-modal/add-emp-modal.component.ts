import { Component } from '@angular/core';
import { Emp, Job, ModalObj } from 'src/app/Model';
import { EmpListService } from 'src/app/services/emp-list/emp-list.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-add-emp-modal',
  templateUrl: './add-emp-modal.component.html',
  styleUrls: ['./add-emp-modal.component.scss'],
})
export class AddEmpModalComponent {
  mo: ModalObj = {
    alert: '',
    msg: '',
    isVisible: false,
    number: 1,
    action: '',
  };
  jobList: Job[];
  newEmp: Emp = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: { street: '', suite: '' },
    branch: { name: '', location: '' },
    job_id: 0,
  };
  emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  constructor(
    private modalService: ModalService,
    private http: HttpService,
    private empListService: EmpListService
  ) {}

  // ngOnInit() {
  //   this.modalService.modalState$.subscribe((obj) => {
  //     this.mo = obj;
  //     if (obj.obj) {
  //       this.newEmp.name = obj.obj.name;
  //       this.newEmp.username = obj.obj.username;
  //       this.newEmp.email = obj.obj.email;
  //       this.newEmp.address.street = obj.obj.address_street ?? '';
  //       this.newEmp.address.suite = obj.obj.address_suite ?? '';
  //       this.newEmp.branch.name = obj.obj.branch_name ?? '';
  //       this.newEmp.branch.location = obj.obj.branch_location ?? '';
  //       this.newEmp.job_id = obj.obj.job.id;
  //     } else {
  //       this.newEmp.name = '';
  //       this.newEmp.username = '';
  //       this.newEmp.email = '';
  //       this.newEmp.address.street = '';
  //       this.newEmp.address.suite = '';
  //       this.newEmp.branch.name = '';
  //       this.newEmp.branch.location = '';
  //       this.newEmp.job_id = 0;
  //     }
  //   });
  //   this.http.getJobList().subscribe((jobs) => (this.jobList = jobs));
  // }
  ngOnInit() {
    this.modalService.modalState$.subscribe((obj) => {
      this.mo = obj;
      if (obj.obj) {
        this.newEmp.id = obj.obj.id;
        this.newEmp.name = obj.obj.name;
        this.newEmp.username = obj.obj.username;
        this.newEmp.email = obj.obj.email;
        this.newEmp.job_id = obj.obj.job?.id;
        this.newEmp.address.street = obj.obj.address_street;
        this.newEmp.address.suite = obj.obj.address_suite;
        this.newEmp.branch.name = obj.obj.branch_name;
        this.newEmp.branch.location = obj.obj.branch_location;
      } else {
        this.newEmp.id = 0;
        this.newEmp.name = '';
        this.newEmp.username = '';
        this.newEmp.email = '';
        this.newEmp.job_id = 0;
        this.newEmp.address.street = '';
        this.newEmp.address.suite = '';
        this.newEmp.branch.name = '';
        this.newEmp.branch.location = '';
      }
    });
    this.http.getJobList().subscribe((jobs) => (this.jobList = jobs));
  }

  onSubmit() {
    switch (this.mo.action) {
      case 'ADD_EMP': {
        if (
          this.newEmp.name.length >= 3 &&
          this.newEmp.name.slice(0, 1).toUpperCase() ==
            this.newEmp.name.slice(0, 1) &&
          this.newEmp.username.length >= 3 &&
          this.emailRegex.test(this.newEmp.email) &&
          this.newEmp.job_id
        ) {
          this.http.addNewEmp(this.newEmp).subscribe(
            (arr: Emp[]) => {
              this.empListService.updateEmpList(arr);
              this.modalService.handleCancel();
              this.modalService.showModal(
                1,
                'Success',
                'Employee was successfully added'
              );
            },
            (err) => {
              this.handleCancel();
              this.modalService.showModal(
                1,
                'Error',
                'Employee details could not be added!'
              );
              console.log(err);
            }
          );
        }
      }

      case 'UPDATE_EMP': {
        if (
          // validation
          this.mo.action == 'UPDATE_EMP' &&
          this.newEmp.name.length >= 3 &&
          this.newEmp.name.slice(0, 1).toUpperCase() ==
            this.newEmp.name.slice(0, 1) &&
          this.newEmp.username.length >= 3 &&
          this.emailRegex.test(this.newEmp.email) &&
          this.newEmp.job_id
        ) {
          this.http.updateEmp(this.newEmp).subscribe(
            (arr: Emp[]) => {
              this.empListService.updateEmpList(arr);

              // close modal
              this.modalService.handleCancel();
              this.modalService.showModal(
                1,
                'Success',
                'Employee details was successfully updated'
              );
            },
            (err) => {
              this.handleCancel();
              this.modalService.showModal(
                1,
                'Error',
                'Employee details could not be updated!'
              );
              console.log(err);
            }
          );
        }
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
