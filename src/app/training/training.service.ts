import { Exercise } from './exercise.model';

// rxjs Event emitter
import { Subject } from 'rxjs';


export class TrainingService {

    // rxjs event emitter. User selected some exercise. This is used to redirect user to the current training page
    exerciseChange = new Subject<Exercise>();

    /** Stores the exercise that user selected
    * Example: Touch-toes
    */
    private runningExercise: Exercise;

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ]

    // stores passed exercises (old exercises)
    private exercises: Exercise[] = [];


    /**
     * Like: id: 'crunches', name: 'Crunches', duration: 30, calories: 8
     */
    getAvailableExercises() {
        //slice creates real copy of that array. Better practice
        return this.availableExercises.slice();
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