import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditStudent, Student } from 'src/app/interfaces/student.interface';
import { StudentService } from 'src/app/services/student.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toaster: ToasterService
  ) {}
  isSubmitted = false;

  selectedStuId = Number(this.route.snapshot.paramMap.get('id'));
  selectedStuData: EditStudent;
  getSelectedStudent() {
    this.studentService.getStudentByID(this.selectedStuId).subscribe({
      next: (res) => {
        this.selectedStuData = res.Data;
        this.editStudentForm.patchValue({
          NameArabic: this.selectedStuData.NameArabic,
          NameEnglish: this.selectedStuData.NameEnglish,
          FirstName: this.selectedStuData.FirstName,
          LastName: this.selectedStuData.LastName,
          Age: this.selectedStuData.Age,
          Mobile: this.selectedStuData.Mobile,
          NationalID: this.selectedStuData.NationalID,
          Email: this.selectedStuData.Email,
        });
      },
      error: (err) => {
        this.toaster.fail(err.Message);
      },
    });
  }
  //edit new student form
  editStudentForm = this.formBuilder.group({
    NameArabic: ['', Validators.required],
    NameEnglish: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Age: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    Mobile: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],

    Email: ['', [Validators.required, Validators.email]],
    NationalID: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
    ID: [`${Number(this.selectedStuId)}`],
  });
  onSubmit() {
    this.isSubmitted = true;

    if (this.editStudentForm.valid) {
      const data = this.editStudentForm.value;
      this.studentService.editStudentByID(data).subscribe({
        next: (res) => {
          this.toaster.success(res.Message);
        },
        error: (err) => {
          this.toaster.fail(err.Message);
        },
      });
    }
  }

  ngOnInit() {
    this.getSelectedStudent();
  }
}
