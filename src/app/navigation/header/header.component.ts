import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // output makes it listenable from outside this component
  // set the type to void because we are not going to emit any payload or object with the event
  @Output() sidenavToggle = new EventEmitter<void>();

  // Is user logged in
  isAuth = false;

  // Store subscription se we can destroy it when we dont need it 
  // releasing memory and prevent unwanted memory leaks
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    // returns boolean value is user authenticated or not and shows logout component accordingly
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  /** Toggles sidenavigation on mobile view
   * 
   * app.component listens for event 
   * after event is emitted app.component opens side navbar
   * 
   */
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  /**
   * Unsubscribes so memory leaks are prevented and memory is released
   */
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
