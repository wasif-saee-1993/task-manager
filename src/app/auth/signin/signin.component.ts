import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard'], {relativeTo: this.route});
    }
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.authService.signIn(f.value.email, f.value.password);
    }
  }
}
