import { Component, OnInit } from '@angular/core';
// Need to import pop up dialog
import { MatDialog } from '@angular/material/dialog';
// Pop up dialog to show
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';



@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  // renders progress on graphical spinner
  progress = 0;
  timer;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }


  /**Timer starts to run when user comes to this component
   * 
   * if progress gets to 100% timer will be stopped
   */
  startOrResumeTimer() {
    // get the exercise user chose and turn the duration into milliseconds
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);

  }

  /** When user presses stop training button. Pop up dialog opens "Are you sure" 
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
        this.trainingService.cancelExercise(this.progress);
      }
      else {
        this.startOrResumeTimer();
      }
    });
  }





}
