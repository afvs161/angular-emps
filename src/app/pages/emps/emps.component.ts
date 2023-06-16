import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Emp, EmpTable, Job, JobFilter } from 'src/app/Model';
import { EmpListService } from 'src/app/services/emp-list/emp-list.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-emps',
  templateUrl: './emps.component.html',
  styleUrls: ['./emps.component.scss'],
})
export class EmpsComponent implements OnInit {
  emps: EmpTable[];
  filteredEmps: EmpTable[];
  search: string = '';
  jobs: JobFilter[] = [];
  listOfColumns = [
    {
      name: 'Role',
      filterMultiple: true,
      listOfFilter: this.jobs,
      filterFn: (selectedJobIds: number[], item) =>
        selectedJobIds.includes(item.job.value),
    },
    { name: 'Name' },
    { name: 'Username' },
    { name: 'Email' },
    { name: 'Branch Info' },
    { name: 'Location' },
    {},
  ];

  constructor(
    private http: HttpService,
    private modalService: ModalService,
    private empListService: EmpListService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.empListService.getList(),
      this.http.getJobList(),
    ]).subscribe(([empList, jobList]) => {
      this.jobs = jobList.map((obj: Job) => ({
        id: obj.id,
        text: obj.name,
        value: obj.name,
      }));
      this.listOfColumns[0].listOfFilter = this.jobs;

      this.emps = empList.map((emp: Emp) => ({
        id: emp.id,
        name: emp.name,
        username: emp.username,
        email: emp.email,
        address_street: emp.address.street,
        address_suite: emp.address.suite,
        branch_name: emp.branch.name,
        branch_location: emp.branch.location,
        job: this.getJobName(emp.job_id),
      }));
    });

    this.searchService.setShowSearchInput(true);
    this.searchService.search$.subscribe((value) => {
      this.search = value;
      let filteredEmps = this.emps.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.username.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
      );
      this.filteredEmps = filteredEmps;
    });
  }

  getJobName(id: number): JobFilter {
    const job = this.jobs.find((obj: JobFilter) => obj.id == id);

    return job
      ? { id: job.id, text: job.text, value: job.value }
      : { id: 0, text: '', value: '' };
  }

  delete(obj: EmpTable): void {
    this.modalService.showModal(
      2,
      'Deleting employee details',
      'Do you really want to remove employee from the list?',
      'DELETE_EMP',
      obj
    );
  }

  update(obj: EmpTable): void {
    this.modalService.showModal(
      3,
      'Change Employee Details',
      '',
      'UPDATE_EMP',
      obj
    );
  }

  addNewEmp() {
    this.modalService.showModal(3, 'New Employee', '', 'ADD_EMP');
  }
}
