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
  };
  jobList: Job[];
  newEmp: Emp = {
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

  ngOnInit() {
    this.modalService.modalState$.subscribe((obj) => (this.mo = obj));
    this.http.getJobList().subscribe((jobs) => (this.jobList = jobs));
  }

  onSubmit() {
    // validate
    if (
      this.newEmp.name.length >= 3 &&
      this.newEmp.name.slice(0, 1).toUpperCase() ==
        this.newEmp.name.slice(0, 1) &&
      this.newEmp.username.length >= 3 &&
      this.emailRegex.test(this.newEmp.email) &&
      this.newEmp.job_id
    ) {
      this.http.addNewEmp(this.newEmp).subscribe((arr: Emp[]) => {
        this.empListService.updateEmpList(arr);

        // close modal
        this.modalService.handleCancel();

        // emtpy values
        for (let prop in this.newEmp) {
          if (
            typeof this.newEmp[prop] === 'object' &&
            this.newEmp[prop] !== null
          ) {
            for (let prop in this.newEmp) {
              this.newEmp[prop] = '';
            }
          } else {
            this.newEmp[prop] = '';
          }
        }
      });
    }
  }

  handleCancel() {
    this.modalService.handleCancel();
  }
}
