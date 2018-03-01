import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  isAuthenticatedUser() {
    this.isAuthenticated = this.authService.isAuthenticated();

    return this.isAuthenticated;
  }

  logout() {
    this.userService.getUser(+this.authService.getUserId())
      .subscribe(user => this.authService.signOut(user));
  }
}
