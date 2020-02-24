import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // output makes it listenable from outside this component
  // set the type to void because we are not going to emit any payload or object with the event
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
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


}
