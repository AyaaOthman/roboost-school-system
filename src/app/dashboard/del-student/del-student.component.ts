import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/services/student.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Student } from 'src/app/interfaces/student.interface';
@Component({
  selector: 'app-del-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],

  templateUrl: './del-student.component.html',
  styleUrls: ['./del-student.component.css'],
})
export class DelStudentComponent {
  @Input() studentID: number;
  @Input() studentsArr: Student[];
  @Output() updateStudents = new EventEmitter<Student[]>();
  private modalService = inject(NgbModal);
  del = faTrash;
  students: Student[];
  constructor(
    private studentService: StudentService,
    private toaster: ToasterService
  ) {}
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  ngOnInit() {}
  delStudent() {
    this.studentService.delStudentByID(this.studentID).subscribe({
      next: (res) => {
        this.modalService.dismissAll();
        this.toaster.success(res.Message);
        this.studentService.getAllStudents().subscribe({
          next: (res) => {
            this.updateStudents.emit((this.students = res.Data));
          },
          error: (err) => {
            this.toaster.fail(err.Message);
          },
        });
      },
      error: (err) => {
        this.toaster.fail(err.Message);
      },
    });
  }
}
