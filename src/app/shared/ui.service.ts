import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class UIService {
    // Used to show loading spinner
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) { }

    showSnackBar(message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration
        });
    }

}