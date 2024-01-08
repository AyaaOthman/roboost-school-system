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
    this.authService.setLogOut().subscribe({
      next: (res) => {
        console.log(res);

        this.router.navigate(['/signin']);
      },
      error: (err) => console.log(err),
    });
  }
}
