import { Component, OnInit } from '@angular/core';
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

  // renders progress on graphical spinner
  progress = 0;
  timer;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    
    /**Timer starts to run when user comes to this component
     * 
     * if progress gets to 100% timer will be stopped
     * shows false error
     */
    this.timer = setInterval(()=> {
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000)
  
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent);
  }





}
