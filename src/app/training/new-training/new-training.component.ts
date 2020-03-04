import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map'




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



  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(data => this.exercises = data)
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  getExercises() {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.exercisesChange.subscribe(data => {
      console.log(data);
    })
  }


  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
