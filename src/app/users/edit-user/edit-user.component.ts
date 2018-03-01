import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
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
export class EditUserComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private breadcrumService: BreadcrumbService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);

    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'users',
        link: 'users'
      }, {
        text: 'user edit',
        link: '',
        css_class: 'active'
      }
    ]);
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.userService.updateUser(id, f.value.user).subscribe();
      this.location.back();
    }
  }

  cancel() {
    this.location.back();
  }
}
