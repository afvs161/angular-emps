import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Userinfo } from 'src/app/Model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserinfoService } from 'src/app/services/userinfo/userinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userinfo: Userinfo;
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private renderer: Renderer2,
    private userinfoService: UserinfoService
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['home']);
    }

    this.userinfoService
      .getUserinfo()
      .subscribe((obj: Userinfo) => (this.userinfo = obj));
  }

  togglePasswordVisible(): void {
    this.passwordVisible = !this.passwordVisible;
    this.renderer.selectRootElement(this.passwordInput.nativeElement).focus();
  }

  submitForm(): void {
    if (
      this.username === this.userinfo.username &&
      this.password === this.userinfo.password
    ) {
      localStorage.setItem('user', 'blessed');
      this.router.navigate(['home']);
    } else {
      this.modalService.showModal(
        1,
        'Error',
        'Username or password is incorrect'
      );
    }
  }
}
