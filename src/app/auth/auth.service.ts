
// rxjs Event emitter
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {

    // rxjs event emitter returns true or false is user is logged in
    authChange = new Subject<boolean>();

    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: 'zzzxx331'
        };
        // emit event that user is logged in
        // (instead of emit we call next)
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: 'zzzxx331'
        };
    }

    logout() {
        this.user = null;
        // emit event that user is logged out
        // (instead of emit we call next)
        this.authChange.next(false);
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

}