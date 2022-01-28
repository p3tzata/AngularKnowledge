import { createReducer } from "@ngrx/store";
import {  on } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";
import {  loadUserSuccess } from "./action";

export interface IUserListState {
    readonly users: IUser[] | null;
};


const initialState: IUserListState =  {
    users: null
};

export const userListReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { users }) => ({ ...state, users })),
);
