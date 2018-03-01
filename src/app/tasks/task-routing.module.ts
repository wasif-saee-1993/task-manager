import { NgModule } from '@angular/core';
import {AdminGuard} from '../guards/admin-guard.service';
import {AuthGuard} from '../guards/auth-guard.service';
import {Routes, RouterModule} from '@angular/router';
import {TasksComponent} from './tasks.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {TaskComponent} from './task/task.component';

const taskRoutes: Routes = [
  { path: '', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'new', component: AddTaskComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: ':id/edit', component: EditTaskComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: ':id', component: TaskComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [
    RouterModule.forChild(taskRoutes)
  ],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
