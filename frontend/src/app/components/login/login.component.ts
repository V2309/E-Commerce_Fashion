// import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent{
//   email: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   constructor(private authService: AuthService, private router: Router) {}

  // login(): void {
  //   const user = { email: this.email, password: this.password };
  //   this.authService.login(user).subscribe(
  //     response => {
  //       console.log('Đăng nhập thành công:', response);
  //       this.authService.login(response.token);
  //       this.router.navigate(['/home']);
  //     },
  //     error => {
  //       console.error('Đăng nhập thất bại:', error);
  //       this.errorMessage = "Email hoặc mật khẩu không đúng";
  //     }
  //    );
  //  }
  // Example login logic in login.component.ts
//   login(): void {
//     const user = { email: this.email, password: this.password };
//     this.authService.login(user).subscribe(
//       response => {
//         console.log('Đăng nhập thành công:', response);
//         if (typeof localStorage !== 'undefined') {
//           localStorage.setItem('user', JSON.stringify(response.data.user));
//           localStorage.setItem('token', response.data.token);
//         }
//         this.router.navigate(['/home']);
//       },
//       error => {
//         console.error('Đăng nhập thất bại:', error);
//         this.errorMessage = "Email hoặc mật khẩu không đúng";
//       }
//     );
//   }
// }

import { Component ,EventEmitter,Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  @Output() userLoggedIn = new EventEmitter<any>();

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const user = { email: this.email, password: this.password };
    console.log('Sending login request with data:', user); // Log the data being sent
    this.authService.login(user).subscribe(
      response => {
        console.log('Đăng nhập thành công:', response);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
          console.log('User in localStorage:', localStorage.getItem('user'));
          console.log('Token in localStorage:', localStorage.getItem('token'));
        }
        this.userLoggedIn.emit(response.data.user);
        // Check if the user is an admin
        if (response.data.user.role === 1) {
         this.router.navigate(['/admin']);
        
        } else {
           this.router.navigate(['/home']);
        }
    
      },
      error => {
        console.error('Đăng nhập thất bại:', error);
        this.errorMessage = "Email hoặc mật khẩu không đúng";
      }
    );
  }
}