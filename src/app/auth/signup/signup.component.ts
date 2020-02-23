import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /** Submitted data from angular form
   * 
   * @param form email and password
   */
  onSubmit(form: NgForm) {
    console.log(form);
  }

}
