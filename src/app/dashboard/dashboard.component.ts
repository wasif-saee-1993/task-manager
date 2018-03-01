import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Task} from '../models/task';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {AuthService} from '../services/auth.service';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('animateRightToLeft', [
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
export class DashboardComponent implements OnInit {
  users: User[];
  tasks: Task[];
  myTasks: Task[];

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private authService: AuthService,
    private breadcrumService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard',
        css_class: 'active'
      }
    ]);
    this.userService.getUsers().subscribe(users => this.users = users);
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    this.taskService.getMyTasks(this.authService.currentUser().id).subscribe(mytasks => this.myTasks = mytasks);
  }

  deleteUser(user: User) {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe();
  }

  getCurrentUser() {
    return this.authService.currentUser();
  }
}
