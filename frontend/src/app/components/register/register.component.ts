import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email : string = '';
  password: string = '';
  name: string = '';
  phone: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const user = { email: this.email, password: this.password, name: this.name, phone: this.phone };
    this.authService.register(user).subscribe(
      response => {
        console.log('Đăng ký thành công:', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Đăng ký thất bại:', error);
      }
    );
  }
}