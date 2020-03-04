import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'
import { UIService } from 'src/app/shared/ui.service';




@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})



export class NewTrainingComponent implements OnInit, OnDestroy {

  // Get available exercise in here
  exercises: Exercise[];
  // Get exercises asynchronously
  exerciseSubscription: Subscription;

  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isloading => {
      this.isLoading = isloading;
    })
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(data => this.exercises = data)
    this.fetchExercises();
  }

  ngOnDestroy(): void {
    // making sure error is avoided
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  getExercises() {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.exercisesChange.subscribe(data => {
      console.log(data);
    })
  }

  /** Fetch exercises from the server
   * 
   * like crunches, touch toes etc.
   */
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
