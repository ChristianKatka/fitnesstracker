import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-stop-training',
    template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content>
        <p>You already got {{ passedData.progress }}%</p>
    </mat-dialog-content>
    <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
    `
})

export class StopTrainingComponent { 
    
    /** Get progress data to this pop up component
     * 
     * @param passedData object that has progress value.
     * "you have already accomplished 10% of the work out are you sure you want to quit"
     */
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}


