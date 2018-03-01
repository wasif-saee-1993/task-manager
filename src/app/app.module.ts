import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './services/user.service';
import {TaskService} from './services/task.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeedbackService} from './services/feedback.service';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth-guard.service';
import {AdminGuard} from './guards/admin-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CanDoModule} from './directives/can-do.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {BreadcrumbService} from './services/breadcrumb.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    SigninComponent,
    BreadcrumbsComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CanDoModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    TaskService,
    FeedbackService,
    AuthService,
    CookieService,
    AuthGuard,
    AdminGuard,
    BreadcrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
