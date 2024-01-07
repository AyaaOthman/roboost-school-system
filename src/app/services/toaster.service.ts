import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private default_error = 'Something Went Wrong';

  constructor(private Toaster: ToastrService) {}

  success(message: string, title?: string): void {
    this.Toaster.success(message, title);
  }

  fail(message: string): void {
    this.Toaster.error(message || this.default_error);
  }
}
