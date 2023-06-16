import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['home']);
    }
  }

  togglePasswordVisible(): void {
    this.passwordVisible = !this.passwordVisible;
    this.renderer.selectRootElement(this.passwordInput.nativeElement).focus();
  }

  submitForm(): void {
    if (this.username == 'user' && this.password == 'user') {
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
