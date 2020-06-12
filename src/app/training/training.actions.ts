import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVALIABLE_TRAINING = '[Training] Set Avaliable Training';
export const SET_PAST_TRAINING = '[Training] Set Past Training';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvaliableTraining implements Action{
    readonly type = SET_AVALIABLE_TRAINING;

    constructor(public payload : Exercise[]){
    }
}

export class SetPastTraining implements Action{
    readonly type = SET_PAST_TRAINING;

    constructor(public payload : Exercise[]){
    }
}

export class StartTraining implements Action{
    readonly type = START_TRAINING;

    constructor(public payload : string){
    }
}

export class StopTraining implements Action{
    readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvaliableTraining 
                                | SetPastTraining 
                                | StartTraining 
                                | StopTraining ;