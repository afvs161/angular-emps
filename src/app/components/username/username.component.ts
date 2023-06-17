import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Userinfo } from 'src/app/Model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit {
  userinfo: Userinfo;
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(
    private renderer: Renderer2,
    private userinfoService: UserinfoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userinfoService
      .getUserinfo()
      .subscribe((obj: Userinfo) => (this.userinfo = obj));
  }

  togglePasswordVisible(): void {
    this.passwordVisible = !this.passwordVisible;
    this.renderer.selectRootElement(this.passwordInput.nativeElement).focus();
  }

  submitForm(): void {
    if (this.password === this.userinfo.password) {
      // set new username
      this.userinfoService
        .setNewUsername({
          username: this.username,
          password: this.password,
        })
        .subscribe(
          () => {
            this.modalService.showModal(
              1,
              'Success',
              'Username was successfully changed!'
            );
          },
          (err) => {
            console.log(err);
            this.modalService.showModal(
              1,
              'Error',
              'Password could not be changed!'
            );
          }
        );
      this.username = '';
      this.password = '';
    } else {
      this.modalService.showModal(1, 'Error', 'Incorrect password!');
    }
  }
}
