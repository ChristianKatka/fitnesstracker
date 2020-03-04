

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

// rxjs Event emitter
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

// Injectable is needed to use service in a service (router)
@Injectable()
export class AuthService {

    // rxjs event emitter returns true or false. Is user is logged in or not
    authChange = new Subject<boolean>();

    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private errorMsgSnackBar: MatSnackBar,
        private uiService: UIService) { }

    private isAuthenticated = false;

    /** Listens if user is logged in or not
     * 
     * gets called from app.component.ts when app starts
     */
    initAuthListener() {
        // authstate emits event when ever auth state changes
        this.afAuth.authState.subscribe(user => {
            // if user is authenticated
            if (user) {
                this.isAuthenticated = true;
                // emit event that user is logged in
                // (instead of emit we call next)
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }
            else {
                // kill subscriptions to database
                this.trainingService.cancelSubscriptions();
                // emit event that user is logged out
                // (instead of emit we call next)
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }

        })
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        // returns promise and we can listen success case
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(err => {
                this.uiService.loadingStateChanged.next(false);
                this.errorMsgSnackBar.open(err.message, null, {
                    duration: 4000
                });
                console.log(err);
            });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(err => {
                this.uiService.loadingStateChanged.next(false);
                this.errorMsgSnackBar.open(err.message, null, {
                    duration: 4000
                });
                console.log(err);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }


}
