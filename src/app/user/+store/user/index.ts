import { ActionReducerMap } from "@ngrx/store";
import { IUserListState, userListReducer } from "./reducer";

export interface IUserState {
    readonly list: IUserListState;
}

export const reducers: ActionReducerMap<IUserState> = {
    list: userListReducer,
}