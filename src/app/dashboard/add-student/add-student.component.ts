import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/services/student.service';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  private modalService = inject(NgbModal);
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toaster: ToasterService
  ) {}
  isSubmitted = false;
  //modal open
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  //add new student form
  addStudentForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    Age: ['', Validators.required],
    Mobile: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    NationalID: ['', Validators.required],
  });
  onSubmit() {
    this.isSubmitted = true;

    if (this.addStudentForm.valid) {
      const data = this.addStudentForm.value;
      this.studentService.AddStudent(data).subscribe({
        next: (res) => {
          this.modalService.dismissAll();
          this.toaster.success(res.Message);
        },
        error: (err) => {
          this.toaster.fail(err.Message);
        },
      });
    }
  }
}
