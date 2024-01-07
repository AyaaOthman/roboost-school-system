import { Component } from '@angular/core';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private studentService: StudentService) {}
  studentsArr: Student[] = [];
  getStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.studentsArr = res.Data;
        console.log(this.studentsArr);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit() {
    this.getStudents();
  }
}
