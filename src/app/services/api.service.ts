//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API path
  base_path = 'http://knitfitco.com/knitfitnew/api';
  //login_path='http://knitfitco.com/knitfitnew/api/login'
  constructor(private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
    	'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
  
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
 
 //create registration
 createregister(first_name,last_name,user_name,password,confirm_password,email,term):Observable<any>{
	const headers = new HttpHeaders();
	headers.append('Accept', 'application/json');
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
   let body =  "first_name=" + first_name + "&last_name=" + last_name + "&username=" + user_name + "&password=" + password +
     "&confirm_password=" + confirm_password + "&email=" + email +"&terms_and_conditions=" + term; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
      return this.http.post(`${this.base_path}/register`,body
   , httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err)
        })
      )
    } 

     //create login
 createLogin(email,password):Observable<any>{
	//const headers = new HttpHeaders();
	//headers.append('Accept', 'application/json');
	//headers.append('Content-Type', 'application/x-www-form-urlencoded');
   let body =  'email=' + email + '&password=' + password  ; 
   //let body =  'email=' + email + '&password=\"'+password+'\"'  ; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
      return this.http.post(`${this.base_path}/login`,body
   , httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err)
        })
      )
    } 
  // Get single student data by ID
  /*getItem(id): Observable<Student> {
    return this.http
      .get<Student>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
 
  // Get students data
 /* getList(): Observable<Student> {
    return this.http
      .get<Student>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
*/ 
  // Update item by id
 /* updateItem(id, item): Observable<Student> {
    return this.http
      .put<Student>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
 
  // Delete item by id
  /*deleteItem(id) {
    return this.http
      .delete<Student>(this.base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }*/
 
}