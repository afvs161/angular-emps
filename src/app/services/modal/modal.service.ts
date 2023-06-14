import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmpTable, ModalObj } from 'src/app/Model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalObj>({
    alert: '',
    msg: '',
    isVisible: false,
    number: 0,
  });
  public modalState$ = this.modalState.asObservable();

  constructor() {}

  showModal(
    number,
    alert?: string,
    msg?: string,
    action?: string,
    obj?: EmpTable
  ) {
    const newState: ModalObj = {
      number,
      alert,
      msg,
      isVisible: true,
      action,
      obj,
    };
    this.modalState.next(newState);
  }

  handleCancel() {
    const newState: ModalObj = {
      number: 0,
      alert: '',
      msg: '',
      isVisible: false,
    };
    this.modalState.next(newState);
  }
}
