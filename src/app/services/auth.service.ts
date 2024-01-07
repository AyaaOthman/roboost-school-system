import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://api.mohamed-sadek.com/';
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();
  constructor(private httpClient: HttpClient) {}
  userRegister(data: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}User/POST`, data);
  }
  userLogin(data: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}User/Login`, data);
  }
  setLoggedIn(token: string, auth: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('auth', auth);
    this.loggedIn.next(true);
  }
  isAuthorized(): boolean {
    const authorized = localStorage.getItem('auth');
    if (authorized) {
      console.log('authorized', authorized);
      return true;
    }
    return false;
  }
}
