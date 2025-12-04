import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,FormsModule,CommonModule],
  // templateUrl: './login.html',
  styleUrl: './login.scss',
  templateUrl: './login.html'
})
export class Login {
  email = '';
  password = '';
  hidePassword = true;

  constructor(private router: Router, private userService: UserService) {}

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }


  onLogin() {
    const credentials = { email: this.email, password: this.password };

    this.userService.login(credentials).subscribe({
      next: (res) => {
        if (!res.ok) {
          console.error(res.message || 'Credenciais inválidas');
          return;
        }
        console.log('Login bem-sucedido:', res);
        this.router.navigate(['/folders']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
      },
    });
  }

  // login() {
  //   console.log('Email:', this.email);
  //   console.log('Senha:', this.password);
  //   alert('Login enviado!');
  // }



  goToSignin() {
    this.router.navigate(['/signin']);
  }

}