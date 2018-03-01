import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from './users.component';
import {UserComponent} from './user/user.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {AddUserComponent} from './add-user/add-user.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserComponent,
    EditUserComponent,
    AddUserComponent
  ]
})
export class UserModule { }
