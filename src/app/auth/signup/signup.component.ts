import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

// Biggest date you can pick from date picker (have to be 18y old)
  maxDate

  constructor() { }

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
    console.log(form);
  }

}
