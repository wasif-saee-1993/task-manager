import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import {AuthService} from "../../services/auth.service";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
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
export class AddTaskComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private location: Location,
    private authService: AuthService,
    private breadcrumService: BreadcrumbService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'tasks',
        link: '/tasks'
      }, {
        text: 'add new task',
        link: '',
        css_class: 'active'
      }
    ]);
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      f.value.task.creator_id = this.authService.currentUser().id;
      this.taskService.addTask(f.value.task).subscribe();
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }
}
