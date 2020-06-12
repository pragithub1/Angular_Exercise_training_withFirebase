import {  Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { UiService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as UI from '../shared/ui.actions';

@Injectable()
export class TrainingService{
    dbSub : Subscription[] = [];

    constructor(private db : AngularFirestore, 
                private uiService : UiService,
                private store : Store<fromTraining.State>){}

    fetchTraining(){
        // this.uiService.loadingChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
       this.dbSub.push(this.db
        .collection('available_exercises')
        .snapshotChanges()
        .pipe(map(docArray => {
            // throw(new Error());
          return docArray.map(doc => {
            const data = doc.payload.doc.data() as Exercise;
            const id = doc.payload.doc.id;
            return { id, ...data };
          });
        }))
        .subscribe((exercises : Exercise[]) => {
            // this.uiService.loadingChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch( new Training.SetAvaliableTraining(exercises) );
        },error => {
            // this.uiService.loadingChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSanckbar("Error Fetching Exercises, Please try again later!!", null , 3000);
            this.store.dispatch(new Training.StopTraining());
        }
         ))
    }

    fetchCompletedOrCancelledExercises(){
        this.dbSub.push(this.db
        .collection('finishedExercise')
        .valueChanges()
        .subscribe((exercises : Exercise[]) => {
            this.store.dispatch( new Training.SetPastTraining(exercises) );
        })
        )
    }

    clearSub(){
        this.dbSub.forEach(sub => {
            sub.unsubscribe();
        });
    }

    startExercise(exerciseId : string){
        // this.runningExercise = this.availableExercise.find(ex => ex.id === exerciseId);
        // this.exerciseChanged.next({...this.runningExercise});
        this.store.dispatch( new Training.StartTraining(exerciseId) );
    }


    trainingCancelled(progress : number){
        this.store.select(fromTraining.getRunningTraining).pipe(take(1)).subscribe(runningExercise => {
            this.addDataToDatabase({...runningExercise, 
                calories : runningExercise.calories * (progress/100),
                duration : runningExercise.duration * (progress/100),
                date  : new Date(),
                state : 'cancelled'
                });
                this.store.dispatch( new Training.StopTraining() );
        });
    }

    trainingCompleted(){
        this.store.select(fromTraining.getRunningTraining).pipe(take(1)).subscribe(runningExercise => {
            this.addDataToDatabase({...runningExercise,
                date : new Date(),
                state : 'completed'
                });
                this.store.dispatch( new Training.StopTraining() );
        });
    }

    private addDataToDatabase(exercise : Exercise){
        this.db.collection('finishedExercise').add(exercise);
    }
}