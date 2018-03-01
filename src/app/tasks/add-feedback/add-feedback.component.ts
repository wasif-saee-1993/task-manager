import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FeedbackService} from '../../services/feedback.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  comment: string;
  @Output() addedFeedback: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  addFeedback() {
    const taskId = +this.route.snapshot.paramMap.get('id');

    this.feedbackService.addFeedback({
      comment: this.comment,
      creator_id: +this.authService.getUserId(),
      task_id: taskId
    }).subscribe(() => this.addedFeedback.emit({}));

    this.comment = '';
  }
}
