import { Component } from '@angular/core';

import { 
  Route, 
  Router 
} from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signin',
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,FormsModule,CommonModule],
  // templateUrl: './signin.html',
  styleUrl: './signin.scss',
  templateUrl: './signin.html'
})
export class Signin {

  email = '';
  password = '';
  name: string = '';

  hidePassword = true;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onRegister() {
    const userData = { username: this.name, email: this.email, password: this.password };

    this.userService.register(userData).subscribe({
      next: (res) => {
        console.log('Usuário registrado:', res);
        this.router.navigate(['/folders']);
      },
      error: (err) => {
        console.error('Erro ao registrar:', err);
      }
    });
  }

  signIn() {
    const loginData = { email: this.email, password: this.password };

    this.userService.login(loginData).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido:', res);
        this.router.navigate(['/recomendacoes']);
      },
      error: (err) => {
        console.error('Erro ao logar:', err);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}