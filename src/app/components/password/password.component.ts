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
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  userinfo: Userinfo;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
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
    if (this.oldPassword === this.userinfo.password) {
      if (
        this.newPassword === this.confirmPassword &&
        this.newPassword.length >= 3
      ) {
        this.userinfoService
          .setNewUsername({
            username: this.userinfo.username,
            password: this.newPassword,
          })
          .subscribe(
            () => {
              this.modalService.showModal(
                1,
                'Success',
                'Password was successfully changed!'
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
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      } else {
        this.modalService.showModal(
          1,
          'Error',
          'New passwords does not match!'
        );
      }
    } else {
      this.modalService.showModal(1, 'Error', 'Incorrect password!');
    }
  }
}
