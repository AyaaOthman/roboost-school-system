import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private signinFormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {}
  isSubmitted = false;
  signinForm = this.signinFormBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.signinForm.valid) {
      const data: any = this.signinForm.value;
      this.authService.userLogin(data).subscribe({
        next: (res) => {
          if (res.Success) {
            const token = res.Data;
            const authorized = res.IsAuthorized;
            this.authService.setLoggedIn(token, authorized);
            this.toaster.success('تم تسجيل الدخول بنجاح');

            this.router.navigate(['dashboard']);
          } else {
            this.toaster.fail('اسم المستخدم أوكلمة المرور خاطئة');
          }
          console.log(res);
        },
        error: (err) => {
          this.toaster.fail('حدث خطأ برجاء المحاولة لاحقًا');
          console.log(err);
        },
      });
    }

    console.log(this.signinForm.value);
  }
}
