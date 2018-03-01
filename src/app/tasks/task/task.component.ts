import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {AuthService} from "../../services/auth.service";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
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
export class TaskComponent implements OnInit {

  task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private breadcrumService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.getTask();
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'tasks',
        link: '/tasks'
      }, {
        text: 'task detail',
        link: '',
        css_class: 'active'
      }
    ]);
  }

  refreshTask(e) {
    this.getTask();
  }

  getTask() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe( (task) => {
      this.task = task;
      if (task.assignee_id !== this.currentUserId() && this.currentUser().type_id !== 1) {
        this.router.navigate(['/tasks'], {relativeTo: this.route});
      }
    });
  }

  currentUserId() {
    return this.authService.currentUser().id;
  }

  currentUser() {
    return this.authService.currentUser();
  }
}
