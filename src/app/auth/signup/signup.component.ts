import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserForm } from 'src/app/interfaces/register.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private signupFormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {}
  isSubmitted = false;

  //validation regex pattern
  nameRegex = '^[A-Z][A-Za-z ]{2,}$';
  userNameRegex = '^[A-Za-z][A-Za-z0-9./ -]{2,}$';
  passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%?&])[A-Za-zd@$!%?&]{8,}$';
  //sign up form control
  signupForm = this.signupFormBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
    userName: [
      '',
      [Validators.required, Validators.pattern(this.userNameRegex)],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(this.passwordRegex)],
    ],
  });

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.signupForm.valid) {
      const data: any = this.signupForm.value;
      this.authService.userRegister(data).subscribe({
        next: (res) => {
          if (res.Success) {
            this.toaster.success(res.Message);
            this.router.navigate(['signin']);
          } else {
            this.toaster.fail(res.Message);
          }
        },
        error: (err) => {
          this.toaster.fail('حدث خطأ برجاء المحاولة لاحقًا');
        },
      });
    }
  }
}
