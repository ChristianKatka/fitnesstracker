import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

// Biggest date you can pick from date picker (have to be 18y old)
  maxDate

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    // Get todays date 18 years ago
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  /** Submitted data from angular form
   * 
   * @param form email and password
   */
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
