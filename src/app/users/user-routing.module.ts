import { NgModule } from '@angular/core';
import {UsersComponent} from './users.component';
import {AdminGuard} from '../guards/admin-guard.service';
import {AuthGuard} from '../guards/auth-guard.service';
import {AddUserComponent} from './add-user/add-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {UserComponent} from './user/user.component';
import {Routes, RouterModule} from '@angular/router';

const userRoutes: Routes = [
  { path: '', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'new', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: ':id/edit', component: EditUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: ':id', component: UserComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
