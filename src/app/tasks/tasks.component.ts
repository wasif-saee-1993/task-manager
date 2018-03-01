import {Component, OnInit} from '@angular/core';
import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {AuthService} from '../services/auth.service';
import {BreadcrumbService} from '../services/breadcrumb.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
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
export class TasksComponent implements OnInit {
  tasks: Task[];
  filterTask = '';

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private breadcrumService: BreadcrumbService) { }

  ngOnInit() {
    var user = this.authService.currentUser();
    if (user.type_id === 1) {
      this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    } else {
      this.taskService.getMyTasks(user.id).subscribe(tasks => this.tasks = tasks);
    }

    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'tasks',
        link: '/tasks',
        css_class: 'active'
      }
    ]);
  }

  delete(task: Task) {
    this.taskService.deleteTask(task.id).subscribe();
  }

  getCurrentUser() {
    return this.authService.currentUser();
  }
}
