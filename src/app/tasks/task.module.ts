import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {AddTaskComponent} from './add-task/add-task.component';
import {AddFeedbackComponent} from './add-feedback/add-feedback.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {FeedbacksComponent} from './feedbacks/feedbacks.component';
import {TaskComponent} from './task/task.component';
import {TasksComponent} from './tasks.component';
import {TaskRoutingModule} from './task-routing.module';
import {TruncatePipe} from '../pipes/truncate.pipe';
import {SortablePipe} from '../pipes/sortable.pipe';
import {CanDoModule} from '../directives/can-do.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    CanDoModule
  ],
  declarations: [
    AddTaskComponent,
    AddFeedbackComponent,
    EditTaskComponent,
    FeedbacksComponent,
    TaskComponent,
    TasksComponent,
    TruncatePipe,
    SortablePipe
  ]
})
export class TaskModule { }
