
import { Action, createReducer, on, State } from "@ngrx/store";
import { IAppState } from ".";
import * as globalAction from './action'

export const initialAppState:IAppState = {
    global:{showSpinner: false, showDialogSpinner: false},
    userModule: undefined

  };

const globalReducerCreator = createReducer(
    initialAppState,
    on(globalAction.showSpinner, (state)=> {return {...state,showSpinner:true}}),
    on(globalAction.showDialogSpinner, (state)=> {return {...state,showDialogSpinner:true}}),
    on(globalAction.hideSpinner, (state)=> {return {...state,showSpinner:false, showDialogSpinner:false }})
)


export function global (state:any, action: Action) {
 
    return globalReducerCreator(state,action);

}
