import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('listAddAnimation', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(500)
      ]),
      transition('* => void', animate(500, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      )
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Task Manager';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  isAuthenticatedUser() {
    return this.authService.isAuthenticated();
  }

  getCurrentUser() {
    return this.authService.currentUser();
  }
}
