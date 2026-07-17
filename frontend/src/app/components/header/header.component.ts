//  import { Component,OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
//  @Component({
//    selector: 'app-header',
//    standalone: false,
  
//    templateUrl: './header.component.html',
//    styleUrl: './header.component.css'
//  })
//  export class HeaderComponent {

// }
import { Component, OnInit, EventEmitter ,Output } from '@angular/core';
import { on } from 'events';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
    standalone: false,
      templateUrl: './header.component.html',
     styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any = null;

 
  @Output() userLoggedIn = new EventEmitter<any>();
  constructor(private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  
  }
  onUserLoggedIn(user: any): void {
    this.user = user;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }
    this.user = null;
  }
}