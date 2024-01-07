import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logOut() {
    console.log(5);
    this.authService.setLogOut();
    this.router.navigate(['/signin']);
  }
}
