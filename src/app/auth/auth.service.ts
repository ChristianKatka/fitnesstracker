

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


// rxjs Event emitter
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

// Injectable is needed to use service in a service (router)
@Injectable()
export class AuthService {

    // rxjs event emitter returns true or false. Is user is logged in or not
    authChange = new Subject<boolean>();

    private user: User;

    constructor(private router: Router) { }


    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: 'zzzxx331'
        };
        this.authSuccesfull();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: 'zzzxx331'
        };
        this.authSuccesfull();
    }

    logout() {
        this.user = null;
        // emit event that user is logged out
        // (instead of emit we call next)
        this.authChange.next(false);
        this.router.navigate(['/login']);

    }

    getUser() {
        // ... so it makes new user with same data. (better practice than directly returning the user)
        // Wont interfere if something is changed in the user
        return { ...this.user };
    }

    isAuth() {
        // return true if user IS NOT NULL
        // return false if user is null
        return this.user != null;
    }

    private authSuccesfull() {
        // emit event that user is logged in
        // (instead of emit we call next)
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

}
