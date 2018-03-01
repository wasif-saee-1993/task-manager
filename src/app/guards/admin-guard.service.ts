import { Injectable } from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  canActivate() {
    var user = this.authService.currentUser();

    if (user && user.type_id === 1) {
      return true;
    } else {
      this.router.navigate(['/'], {relativeTo: this.route});
    }
  }

}
