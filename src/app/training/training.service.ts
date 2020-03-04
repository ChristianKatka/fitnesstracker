import { Exercise } from './exercise.model';

// rxjs Event emitter
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { UIService } from '../shared/ui.service';

// To inject angular firestore
@Injectable()
export class TrainingService {

    // rxjs event emitter. User selected one exercise. This is used to redirect user to the current training page
    exerciseChange = new Subject<Exercise>();
    // Used to show exercises in new training component. get exercises asynchronously to the list where user chooses exercise
    exercisesChange = new Subject<Exercise[]>();
    // get passed exercises to table
    finishedExercisesChanged = new Subject<Exercise[]>();

    /** Stores the exercise that user selected
    * Example: Touch-toes
    */
    private runningExercise: Exercise;
    private availableExercises: Exercise[] = []

    // firebase subscriptions. Used to manage error due to logout and still having active subscriptions to the firestore db
    private fbSubs: Subscription[] = [];



    constructor(private db: AngularFirestore, private uiService: UIService) { }

    /**
     * Like: id: 'qwe2w12', name: 'Crunches', duration: 30, calories: 8
     */
    fetchAvailableExercises() {
        // start the spinner
        this.uiService.loadingStateChanged.next(true);
        // snapshotChanges is observable that gets availableExercise collection from firebase database
        // like touch toes, crunches etc.
        this.fbSubs.push(
            this.db
                .collection('availableExercises')
                .snapshotChanges()
                .map(docArray => {
                    // throw(new Error);
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
                    this.exercisesChange.next([... this.availableExercises])
                    this.uiService.loadingStateChanged.next(false);
                }, error => {
                    this.uiService.loadingStateChanged.next(false);
                    this.uiService.showSnackBar('Error fetching exercises from the server', null, 4000);
                    // when exercises are null. reload exercise button shows up to user to trigger fetchAvailableExercises again
                    this.exercisesChange.next(null);
                })
        );
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
        this.addDataToDatabase({ ... this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
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

    /** array of exercises that user has completed and or canceled
     * valuechanges get all columns but not meta data like id
     * 
     * emits event of finished exercises
     */
    fetchCompletedOrCanceledExercises() {
        this.fbSubs.push(
            this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
            }, error => {
                console.log(error);
            })
        );
    }


    /** Cancel active subscriptions to the datbase after logging out
     * 
     */
    cancelSubscriptions() {
        // unsubscribe for every subscription in the array
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    /** Add excercise data to db
     * 
     * @param exercise name of the excercise, date etc.
     */
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }


}