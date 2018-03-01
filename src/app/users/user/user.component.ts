import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private breadcrumService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.getUser();
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'users',
        link: 'users'
      }, {
        text: 'user details',
        link: `users/${((this.user && this.user.id))}`,
        css_class: 'active'
      }
    ]);

  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }
}
