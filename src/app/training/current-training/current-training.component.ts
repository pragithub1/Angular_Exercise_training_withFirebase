import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  currentExercise$ : Observable<Exercise>;
  constructor( private dialog : MatDialog,
     private trainingService : TrainingService,
     private store : Store<fromTraining.State>
     ) { }

  ngOnInit() {
   this.startOrResumeTimer();
   this.currentExercise$ = this.store.select(fromTraining.getRunningTraining);
  }

  startOrResumeTimer(){
    this.store.select(fromTraining.getRunningTraining).pipe(take(1)).subscribe(runningTraining => {
      const step = runningTraining.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if(this.progress >= 100){
          this.trainingService.trainingCompleted();
          clearInterval(this.timer);
        }
        }, step);
    });
  }

  onStop(){
    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data : {
        progress : this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trainingService.trainingCancelled(this.progress);
      }else{
        this.startOrResumeTimer();
      }
    });
  }

}

