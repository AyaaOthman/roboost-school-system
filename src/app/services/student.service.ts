import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = 'https://api.mohamed-sadek.com/';

  constructor(private httpClient: HttpClient) {}
  getAllStudents(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}Student/Get`);
  }
}
