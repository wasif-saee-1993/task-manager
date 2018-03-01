import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './guards/auth-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', loadChildren: './tasks/task.module#TaskModule' },
  { path: 'users', loadChildren: './users/user.module#UserModule' },
  { path: 'bulkfeedback', loadChildren: './bulk-feedback/bulk-feedback.module#BulkFeedbackModule' },
  { path: 'login', component: SigninComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
