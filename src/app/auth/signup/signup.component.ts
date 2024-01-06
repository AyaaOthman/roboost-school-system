import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForm } from 'src/app/interfaces/register.interface';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
constructor( private signupFormBuilder: FormBuilder, private authService:AuthService, private router:Router){}
isSubmitted = false;

//validation regex pattern
nameRegex = "^[A-Z][A-Za-z ]{2,}$"
userNameRegex = "^[A-Za-z][A-Za-z0-9./ -]{2,}$"
passwordRegex ="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$"
//sign up form control
signupForm = this.signupFormBuilder.group({
  name:['',[Validators.required,Validators.pattern(this.nameRegex)]],
  userName:['',[Validators.required,Validators.pattern(this.userNameRegex)]],
  password:['',[Validators.required,Validators.pattern(this.passwordRegex)]],

})

onSubmit() :void{
  this.isSubmitted = true;
  if(this.signupForm.valid){

    const data:any = this.signupForm.value
    this.authService.userRegister(data).subscribe({
      next: (res) => {
        this.router.navigate(['signin'])
        console.log(res);
       
      },
      error: (err) => {
        console.log(err);
       
      },
    })
  }
  

console.log(this.signupForm.value)
console.log(this.signupForm.valid)
}
}
