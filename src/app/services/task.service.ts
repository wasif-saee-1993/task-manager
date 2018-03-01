import { Injectable } from '@angular/core';
import {Task} from '../models/task';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {AuthService} from "./auth.service";

@Injectable()
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap((task: Task) => this.log(`added task w/ id=${task.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`fetched Task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    })
      .pipe(
        tap(tasks => this.log('fetched tasks')),
        catchError(this.handleError('getTasks', []))
      );
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`deleted Task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  updateTask(id: number, task: Task): Observable<any> {
    task.id = id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.patch(url, task, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  getMyTasks(assigneeId: number) {
    let params = new HttpParams();
    params = params.append('assignee_id', assigneeId.toString());

    const url = `${this.tasksUrl}?assignee_id=${assigneeId}`;
    return this.http.get<Task[]>(this.tasksUrl, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }),
      params: params
    })
      .pipe(
        tap(tasks => this.log('fetched tasks')),
        catchError(this.handleError('getTasks', []))
      );
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
    console.log('TaskService: ' + message);
  }
}
