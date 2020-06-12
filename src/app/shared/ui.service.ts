import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class UiService {
    loadingChanged = new Subject<boolean>();

    constructor(private snackbar : MatSnackBar){}

    showSanckbar(message, action, duration){
        this.snackbar.open(message, action, {
            duration : duration
        });
    }
}