import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';


import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService{
    isAuthenticated = false;

    constructor(private router : Router, 
        private afAuth : AngularFireAuth,
        private trainingService : TrainingService,
        private snackbar : MatSnackBar,
        private uiService : UiService,
        private store : Store<fromRoot.State>){}

    registerUser(userData : AuthData){
        // this.uiService.loadingChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(result => {
            // this.uiService.loadingChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        })
        .catch(error => {
            // this.uiService.loadingChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSanckbar(error.message, null, 3000);
        });
    }

    login(userData : AuthData){
        // this.uiService.loadingChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then(result => {
            // this.uiService.loadingChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        })
        .catch(error => {
            // this.uiService.loadingChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSanckbar(error.message, null, 3000);
        });
    }

    initAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            }else{
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/']);
                this.trainingService.clearSub();
            }
        });
    }

    logout(){
        this.afAuth.auth.signOut();
    }

}