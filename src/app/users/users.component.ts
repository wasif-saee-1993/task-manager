import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
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

export class UsersComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private breadcrumService: BreadcrumbService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'users',
        link: 'users',
        css_class: 'active'
      }
    ]);
  }

  delete(user: User) {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
