import { Injectable } from '@angular/core';
import { HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterResponse, UserForm } from '../interfaces/register.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl ='https://api.mohamed-sadek.com/';

  constructor(private httpClient: HttpClient) { }
  userRegister(data:UserForm):Observable<any>{
return this.httpClient.post(`${this.baseUrl}User/POST`,data)
  }
}
