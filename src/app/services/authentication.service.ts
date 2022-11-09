import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = 'https://fercuchebackendap.herokuapp.com/auth/login';

  currentUserSubject: BehaviorSubject<any>;
  parcero: boolean | undefined;
  constructor(private http: HttpClient) {
    console.log("Service is running...");
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  SignIn(credentials: any): Observable<any> {
    return this.http.post(`${this.url}`, credentials).pipe(
      map(data=>{
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.parcero = true;
        return data;
      })
    );
  }

  get AuthUser() {
    return this.currentUserSubject.value;
  }

  loggedIn() {
    return this.parcero;
  }

  logoutUser() {
    this.parcero = false;
    sessionStorage.clear();
    localStorage.clear();

    this.currentUserSubject.next(null);
    alert('You are LOGGED OUT');
  }
}
