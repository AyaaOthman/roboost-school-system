import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentService } from 'src/app/services/student.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
})
export class SearchComponent {
  studentsArr: Student[];
  @Output() updateStudents = new EventEmitter<Student[]>();
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 500;
  constructor(private studentService: StudentService) {}
  search = faSearch;
  searchInput: string;
  getStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        this.studentsArr = res.Data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handelSearch() {
    this.searchSubject.next(this.searchInput);
  }
  performSearch(searchValue: string) {
    console.log('Performing search for:', searchValue);
    if (this.searchInput != '') {
      const searchResArr = this.studentsArr.filter(
        (student) =>
          Number(this.searchInput) === student.Age ||
          this.searchInput === student.Name ||
          this.searchInput === student.NationalID ||
          this.searchInput === student.Mobile
      );
      console.log(searchResArr);
      this.updateStudents.emit(searchResArr);
    } else {
      this.updateStudents.emit(this.studentsArr);
    }
  }
  ngOnInit() {
    this.getStudents();
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue);
      });
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }
}
