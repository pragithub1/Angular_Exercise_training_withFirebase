import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { TrainingActions, SET_AVALIABLE_TRAINING, SET_PAST_TRAINING, START_TRAINING, STOP_TRAINING } from './training.actions';


export interface TrainingState{
    availableExercise : Exercise[];
    pastExercises : Exercise[];
    runningExercise : Exercise;
}

export interface State extends fromRoot.State{
     training : TrainingState;
}

const initialState: TrainingState = {
    availableExercise : [],
    pastExercises : [],
    runningExercise : null
};

export function trainingReducer(state = initialState, action : TrainingActions){
    switch(action.type){
        case SET_AVALIABLE_TRAINING :
            return {
                ...state,
                availableExercise : action.payload
            }

        case SET_PAST_TRAINING : 
            return {
                ...state,
                pastExercises : action.payload
            }

        case START_TRAINING : 
            return {
                ...state,
                runningExercise : {...state.availableExercise.find(ex => ex.id === action.payload)}
            }

        case STOP_TRAINING :
            return {
                ...state,
                runningExercise : null
            }
        
        default :
            return state
    }
}


export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvaliableTraining = createSelector(getTrainingState,(state : TrainingState) => state.availableExercise) ;
export const getPastTraining = createSelector(getTrainingState, (state : TrainingState) => state.pastExercises) ;
export const getRunningTraining = createSelector(getTrainingState, ((state : TrainingState) => state.runningExercise)) ;
export const getIsRunningTraining = createSelector(getTrainingState, ((state : TrainingState) => state.runningExercise != null)) ;