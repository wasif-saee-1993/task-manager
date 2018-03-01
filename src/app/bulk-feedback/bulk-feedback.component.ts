import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {BreadcrumbService} from '../services/breadcrumb.service';
import { Location } from '@angular/common';
import {FeedbackService} from "../services/feedback.service";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-bulk-feedback',
  templateUrl: './bulk-feedback.component.html',
  styleUrls: ['./bulk-feedback.component.css'],
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
export class BulkFeedbackComponent implements OnInit {
  bulkFeedbackForm: FormGroup;
  myTasks: Task[];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private breadcrumService: BreadcrumbService,
    private location: Location,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.breadcrumService.add([
      {
        text: 'home',
        link: '/dashboard'
      }, {
        text: 'bulk feedback',
        link: '/bulkfeedback',
        css_class: 'active'
      }
    ]);
    this.taskService.getMyTasks(this.authService.currentUser().id).subscribe(mytasks => this.myTasks = mytasks);
    this.bulkFeedbackForm = new FormGroup({
      'comment' : new FormControl(null),
      'task_ids' : new FormControl(null)
    });
  }

  onSubmit() {
    if (this.bulkFeedbackForm.valid) {
      this.createBulkFeedbacks(this.bulkFeedbackForm.value.task_ids, this.bulkFeedbackForm.value.comment);
    }
  }

  createBulkFeedbacks(taskIds, comment) {
    for (const taskId of taskIds) {
      this.feedbackService.addFeedback({
        comment: comment,
        creator_id: +this.authService.getUserId(),
        task_id: taskId
      }).subscribe();
    }

    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}
