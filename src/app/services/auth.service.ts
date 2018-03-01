import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import { of } from 'rxjs/observable/of';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  )
};

@Injectable()
export class AuthService {
  private authUrl = 'http://localhost:3000/authenticate';
  private logoutUrl = 'http://localhost:3000/logout';

  private authToken = '';
  private user_id;
  private user: User;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) {
    this.authToken = cookieService.get('authToken');
    this.user_id = cookieService.get('user_id');
    if (cookieService.get('user')) {
      this.user = JSON.parse(cookieService.get('user'));
    }
  }

  signIn(email: string, password: string) {
    this.http.post<any>(this.authUrl, {email: email, password: password},
      httpOptions).pipe(
      tap(auth => this.log('fetched auth tocken')),
      catchError(this.handleError('getHeroes', []))
    ).subscribe(
      async (response) => {
        if (response.auth_token) {
          this.authToken = response.auth_token;
          this.user_id = response.user.id;
          this.user = response.user;
          this.cookieService.set('authToken', this.authToken);
          this.cookieService.set('user_id', this.user_id.toString());
          this.cookieService.set('user', JSON.stringify(this.user));
          this.router.navigate(['/dashboard'], {relativeTo: this.route});
        } else {
          this.authToken = '';
          alert('unable to login ');
        }
      }
    );
  }

  signOut(user: User) {
    this.http.post<any>(this.logoutUrl, {email: user.email}, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authToken
      })
    }).pipe(
      tap(auth => this.log('fetched auth token')),
      catchError(this.handleError('Logout call', []))
    ).subscribe(
      async (response) => {
        this.user_id = '';
        this.authToken = '';
        this.user = null;

        this.cookieService.deleteAll();
        this.router.navigate(['/login'], {relativeTo: this.route});
      }
    );
  }

  isAuthenticated() {
    return (this.authToken && this.authToken.length > 0);
  }

  getAuthToken() {
    return this.authToken;
  }

  getUserId() {
    return this.user_id;
  }

  currentUser() {
    return this.user;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('UserService: ' + message);
  }
}
