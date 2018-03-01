import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login'], {relativeTo: this.route});
    }
  }
}
