import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';

@NgModule({
    declarations:[
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent],
    imports:[SharedModule,
            TrainingRoutingModule,
            StoreModule.forFeature('training',trainingReducer)],
    exports:[],
    entryComponents : [StopTrainingComponent]
})
export class TrainingModule{}