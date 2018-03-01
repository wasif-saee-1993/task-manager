import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feedback} from '../../models/feedback';
import {FeedbackService} from '../../services/feedback.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  @Input() feedback: Feedback;
  @Output() feedbackChanged: EventEmitter<{}> = new EventEmitter<{}>();

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  removeFeedback() {
    this.feedbackService.deleteFeedback(this.feedback.id).subscribe(() => this.feedbackChanged.emit({}));
  }

  currentUserId() {
    return this.authService.currentUser().id;
  }
}
