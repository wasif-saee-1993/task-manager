import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BulkFeedbackComponent} from './bulk-feedback.component';
import {FeedbackRoutingModule} from './feedback-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FeedbackRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    BulkFeedbackComponent
  ]
})
export class BulkFeedbackModule { }
