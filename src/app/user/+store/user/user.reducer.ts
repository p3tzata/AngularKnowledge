import { createReducer } from "@ngrx/store";
import {  on } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";
import { deleteUserSuccess, editUserSuccess, loadUserSuccess } from "./user.action";

export interface IUserListState {
    readonly users: IUser[] ;
};


const initialState: IUserListState =  {
    users: []
};

export const userListReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { users }) => ({ ...state, users })),
    on(deleteUserSuccess, (state,  { name }) => {
        return {
            ...state,
            users: state.users.filter((user) => user.name != name)
        }
    }),
    on(editUserSuccess, (state, { name }) => {
        
    })
);
