import { Component } from '@angular/core';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentService } from 'src/app/services/student.service';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DelStudentComponent } from '../del-student/del-student.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from '../add-student/add-student.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    DelStudentComponent,
    FontAwesomeModule,
    CommonModule,
    AddStudentComponent,
    RouterModule,
    SearchComponent,
  ],
  standalone: true,
})
export class HomeComponent {
  constructor(private studentService: StudentService) {}
  studentsArr: Student[] = [];
  edit = faPenToSquare;
  spinner = faSpinner;
  isLoading: boolean = true;

  getStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.isLoading = false;

        this.studentsArr = res.Data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateStudents(e: any) {
    console.log('update');
    this.studentsArr = e;
  }

  ngOnInit() {
    this.getStudents();
  }
}
