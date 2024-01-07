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
  AddStudent(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Student/POST`, data);
  }
  getStudentByID(id: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}Student/PUT`, id);
  }
  delStudentByID(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}Student/Delete?id=${id}`);
  }
}
