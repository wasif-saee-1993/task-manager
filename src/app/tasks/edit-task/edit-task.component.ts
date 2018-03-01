import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {User} from '../../models/user';
import {Task} from '../../models/task';
import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
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
export class EditTaskComponent implements OnInit {
  users: User[];
  task: Task;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private location: Location,
    private route: ActivatedRoute,
    private breadcrumService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.taskService.getTask(+this.route.snapshot.paramMap.get('id'))
      .subscribe(task => this.task = task);
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'tasks',
        link: '/tasks'
      }, {
        text: 'task edit',
        link: '',
        css_class: 'active'
      }
    ]);
  }

  onSubmit(f) {
    if (f.valid) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.taskService.updateTask(id, f.value.task).subscribe();
      this.location.back();
    }
  }

  goBack() {
    this.location.back();
  }
}
