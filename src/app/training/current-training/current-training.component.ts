import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Need to import pop up dialog
import { MatDialog } from '@angular/material/dialog';
// Pop up dialog to show
import { StopTrainingComponent } from './stop-training.component';



@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter<any>();


  // renders progress on graphical spinner
  progress = 0;
  timer;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {

    /**Timer starts to run when user comes to this component
     * 
     * if progress gets to 100% timer will be stopped
     */
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000)

  }

  /** When user presses stop training button pop up dialog opens "Are you sure" 
   * 
   * StopTrainingComponent: injection MAT_DIALOG_DATA receives second parameter so data can be send to pop up dialog
   * 
   */
  onStop() {
    clearInterval(this.timer);
    // return referense to current dialog
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // If user pressed YES button to exit training
      if (result) {
        // new-training.component.html Listens this emit call
        this.trainingExit.emit();
      }
      else {
        this.startOrResumeTimer();
      }
    });
  }





}
