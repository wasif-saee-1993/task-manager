import { Injectable } from '@angular/core';
import {Feedback} from '../models/feedback';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {AuthService} from "./auth.service";

@Injectable()
export class FeedbackService {
  private feedbacksUrl = 'http://localhost:3000/feedbacks';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getFeedback(id: number): Observable<Feedback> {
    const url = `${this.feedbacksUrl}/${id}`;
    return this.http.get<Feedback>(url).pipe(
      tap(_ => this.log(`fetched Feedback id=${id}`)),
      catchError(this.handleError<Feedback>(`getFeedback id=${id}`))
    );
  }

  deleteFeedback(id: number): Observable<Feedback> {
    const url = `${this.feedbacksUrl}/${id}`;

    return this.http.delete<Feedback>(url, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap(_ => this.log(`deleted Feedback id=${id}`)),
      catchError(this.handleError<Feedback>('deleteFeedback'))
    );
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.feedbacksUrl, feedback, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        }
      )
    }).pipe(
      tap((feedback: Feedback) => this.log(`added feedback w/ id=${feedback.id}`)),
      catchError(this.handleError<Feedback>('addTask'))
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
