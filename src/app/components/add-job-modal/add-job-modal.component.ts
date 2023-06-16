import { Component } from '@angular/core';
import { Job, ModalObj, NewJob } from 'src/app/Model';
import { HttpService } from 'src/app/services/http/http.service';
import { JobListService } from 'src/app/services/job-list/job-list.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.scss'],
})
export class AddJobModalComponent {
  mo: ModalObj;
  newJob: NewJob = {
    id: 0,
    name: '',
    education: '',
    experience: '',
    responsibilities: '',
    skills: '',
  };

  constructor(
    private modalService: ModalService,
    private http: HttpService,
    private jobListService: JobListService
  ) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((obj: ModalObj) => {
      this.mo = obj;
      if (obj.jobObj) {
        this.newJob.id = obj.jobObj.id;
        this.newJob.name = obj.jobObj.name;
        this.newJob.education = obj.jobObj.education;
        this.newJob.experience = obj.jobObj.experience;
        this.newJob.responsibilities = obj.jobObj.responsibilities.join('. ');
        this.newJob.skills = obj.jobObj.skills.join('. ');
      } else {
        this.newJob = {
          id: 0,
          name: '',
          education: '',
          experience: '',
          responsibilities: '',
          skills: '',
        };
      }
    });
  }

  onSubmit() {
    switch (this.mo.action) {
      case 'ADD_JOB': {
        const newObj: Job = {
          id: 0,
          name: this.newJob.name,
          education: this.newJob.education,
          experience: this.newJob.experience,
          responsibilities: this.validateTextareaValue(
            this.newJob.responsibilities
          ),
          skills: this.validateTextareaValue(this.newJob.skills),
        };
        if (
          newObj.name.length >= 3 &&
          newObj.responsibilities.length >= 1 &&
          newObj.skills.length >= 1
        ) {
          this.http.addNewJob(newObj).subscribe(
            (arr) => {
              this.jobListService.updateJobList(arr);
              this.modalService.showModal(
                1,
                'Success',
                'New job was successfully added!'
              );
              this.emptyObject(this.newJob);
            },
            (err) => {
              console.log(err);
              this.modalService.showModal(
                1,
                'Error',
                'New job could not be added!'
              );
            }
          );
        }
      }

      case 'UPDATE_JOB': {
        const newObj: Job = {
          id: this.newJob.id,
          name: this.newJob.name,
          education: this.newJob.education,
          experience: this.newJob.experience,
          responsibilities: this.validateTextareaValue(
            this.newJob.responsibilities
          ),
          skills: this.validateTextareaValue(this.newJob.skills),
        };
        if (
          newObj.name.length >= 3 &&
          newObj.responsibilities.length >= 1 &&
          newObj.skills.length >= 1
        ) {
          this.http.updateJob(newObj).subscribe(
            (arr) => {
              this.jobListService.updateJobList(arr);
              this.modalService.showModal(
                1,
                'Success',
                'Job details was successfully updated!'
              );
            },
            (err) => {
              console.log(err);
              this.modalService.showModal(
                1,
                'Error',
                'Job details could not be updated!'
              );
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

  validateTextareaValue(textareaValue) {
    let trimmedValue = textareaValue.trim();
    if (trimmedValue.endsWith('.')) {
      trimmedValue = trimmedValue.slice(0, -1);
    }
    let elements = trimmedValue.split('.');
    let result = elements.map((element) => element.trim());
    return result;
  }

  emptyObject(obj: NewJob) {
    for (let prop in obj) {
      obj[prop] = '';
    }
  }
}
