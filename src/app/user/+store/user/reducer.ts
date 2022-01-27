import { createReducer } from "@ngrx/store";
import { on } from "events";
import { loadUsers } from "./action";

export interface IUserListState {
    readonly users: any[] | null
};


const initialState: IUserListState =  {
    users: null
};

export const userListReducer = createReducer(
    initialState,
    // on(loadUsers, (state, { users }) => ({ ...state, users }))
);
