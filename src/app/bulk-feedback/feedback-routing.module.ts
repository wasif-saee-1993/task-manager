import { NgModule } from '@angular/core';

import {AuthGuard} from '../guards/auth-guard.service';
import {Routes, RouterModule} from '@angular/router';
import {BulkFeedbackComponent} from './bulk-feedback.component';

const userRoutes: Routes = [
  { path: '', component: BulkFeedbackComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
