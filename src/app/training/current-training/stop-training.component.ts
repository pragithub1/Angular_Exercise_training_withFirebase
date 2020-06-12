import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector : 'app-stop-training',
    template : `<h1 mat-dialog-title>Are You Sure?</h1>
                <mat-dialog-content>
                <p>You already reached {{passedData.progress}}%</p>
                </mat-dialog-content>
                <mat-dialog-actions>
                <button mat-button [mat-dialog-close]="true">Yes</button>
                <button mat-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>
                `
})
export class StopTrainingComponent{
    constructor(@Inject(MAT_DIALOG_DATA) public passedData:any){}
}