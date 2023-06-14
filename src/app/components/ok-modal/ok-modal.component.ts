import { Component } from '@angular/core';
import { ModalObj } from 'src/app/Model';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-ok-modal',
  templateUrl: './ok-modal.component.html',
  styleUrls: ['./ok-modal.component.scss'],
})
export class OkModalComponent {
  mo: ModalObj = {
    alert: '',
    msg: '',
    isVisible: false,
    number: 1,
  };

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((obj) => (this.mo = obj));
  }

  handleCancel() {
    this.modalService.handleCancel();
  }
}
