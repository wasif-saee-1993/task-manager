import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
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
export class AddUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private location: Location,
    private breadcrumService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'users',
        link: 'users'
      }, {
        text: 'add user',
        link: '/users/new',
        css_class: 'active'
      }
    ]);
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.userService.addUser(f.value.user).subscribe(() => { });
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }
}
