import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  // Biggest date you can pick from date picker (have to be 18y old)
  maxDate;

  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    // auth service login changes observable boolean and we get it in here
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    })

    this.maxDate = new Date();
    // Get todays date 18 years ago
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    // making sure error is avoided
    if(this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
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
