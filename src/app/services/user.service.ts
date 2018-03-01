import { Injectable } from '@angular/core';
import {User} from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    })
      .pipe(
        tap(users => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(id: number, user: User): Observable<any> {
    user.id = id;
    const url = `${this.usersUrl}/${id}`;
    return this.http.patch(url, user, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  currentUser() {
    return this.getUser(+this.authService.getUserId());
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
