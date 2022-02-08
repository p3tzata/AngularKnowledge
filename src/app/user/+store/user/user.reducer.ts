import { createReducer, State } from "@ngrx/store";
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
    on(deleteUserSuccess, (state,  { id }) => {
        return {
            ...state,
            users: state.users.filter((user) => user.id !== id)
        }
    }),
    on(editUserSuccess, (state, { user }) => {
        const index = state.users.indexOf(user);
        return {
            ...state,
            users: state.users.splice(index, 1, user)
        }
    })
);
