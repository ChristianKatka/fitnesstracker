import { Exercise } from './exercise.model';

// rxjs Event emitter
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

// To inject angular firestore
@Injectable()
export class TrainingService {

    // rxjs event emitter. User selected one exercise. This is used to redirect user to the current training page
    exerciseChange = new Subject<Exercise>();
    // Used to show exercises in new training component. get exercises asynchronously to the list where user chooses exercise
    exercisesChange = new Subject<Exercise[]>();

    /** Stores the exercise that user selected
    * Example: Touch-toes
    */
    private runningExercise: Exercise;

    private availableExercises: Exercise[] = []

    // stores passed exercises (old exercises)
    private exercises: Exercise[] = [];


    constructor(private db: AngularFirestore) { }

    /**
     * Like: id: 'qwe2w12', name: 'Crunches', duration: 30, calories: 8
     */
    fetchAvailableExercises() {
        // snapshotChanges is observable that gets availableExercise collection from firebase database
        // like touch toes, crunches etc.
        this.db
            .collection('availableExercises')
            .snapshotChanges()
            .map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().name,
                        duration: doc.payload.doc.data().duration,
                        calories: doc.payload.doc.data().calories
                    };
                });
            })
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                // emitting exercises array so new training component can subscribe to this and get all exercises asynchronously
                this.exercisesChange.next([... this.availableExercises ])
            });
    }

    /** Starts the exercise with selected exercise by user
     * 
     * @param selectedId exerciseID in this case is same as name: example touch toes
     */
    startExercise(selectedId: string) {
        // Finds user selected id from available exercises
        this.runningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        // emit event. return new object runningexercise
        // (instead of emit we call next)
        // used by training component
        this.exerciseChange.next({ ... this.runningExercise });

    }

    /** After user completes exercise
     * 
     * push completed exercise to the exercises array with added properties
     * 
     */
    completeExercise() {
        this.exercises.push({ ... this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ... this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null
        this.exerciseChange.next(null);
    }


    getRunningExercise() {
        // ... so it cannot be mutated outside this service
        return { ... this.runningExercise };
    }

    /** Returns array of exercises that user has completed and or canceled
     * 
     */
    getCompletedOrCanceledExercises() {
        // use slice to get new copy
        return this.exercises.slice();
    }
}