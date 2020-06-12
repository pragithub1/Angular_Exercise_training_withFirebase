import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit{
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort,  {static: false}) sort : MatSort;
  @ViewChild(MatPaginator, {static : false}) paginator : MatPaginator;

  constructor(private trainingService : TrainingService, private store : Store<fromTraining.State>) { }

  ngOnInit() {
    // this.pastExeSub = this.trainingService.pastExercisesChanged.subscribe((pastExercises : Exercise[]) => {
    //   this.dataSource.data = pastExercises;
    //   console.log('pastex',this.dataSource.data);
    // });

    this.store.select(fromTraining.getPastTraining).subscribe(pastTraining => {
      this.dataSource.data = pastTraining;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(filterValue : string){
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
