import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['home']);
    }
  }

  submitForm(): void {
    if (this.username == 'user' && this.password == 'user') {
      localStorage.setItem('user', 'blessed');
      this.router.navigate(['home']);
    } else {
      this.modalService.showModal(1, 'Error', 'Username or password is incorrect');
    }
  }
}
