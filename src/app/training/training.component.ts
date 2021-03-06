import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {



  ongoingTraining = false;
  exerciseSubsricpion = new Subscription;


  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.exerciseChange.subscribe(exercise => {
      // IF user selected some exercise. move to the training page
      if (exercise) {
        this.ongoingTraining = true;
      } // If exercise is null or undefined
      else {
        this.ongoingTraining = false;
      }
    })
  }


  ngOnDestroy(): void {
    if (this.exerciseSubsricpion) {
      this.exerciseSubsricpion.unsubscribe();
    }
  }

}
