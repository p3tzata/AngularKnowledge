import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";

const namescapce = '[USER]';


export const loadUsers = createAction(
    `${namescapce} loadUsers`
);

export const loadUserSuccess = createAction(
    `${namescapce} loadUsersSuccess`,
    props<{ users: IUser[] }>()
);

export const loadUserFailure = createAction(
    `${namescapce} loadUsersFailure`,
    props<{ error: Error }>()
);

export const deleteUser = createAction(
    `${namescapce} deleteUser`,
    props<{ id: number }>()
); 

export const deleteUserSuccess = createAction(
    `${namescapce} deleteUserSuccess`,
    props<{ id: number }>()
);

export const deleteUserFailure = createAction(
    `${namescapce} deleteUserFailure`,
    props<{ error: any}>()
);

export const editUser = createAction(
    `${namescapce} edit user`,
    props<{ user: IUser}>()
);

export const editUserSuccess = createAction(
    `${namescapce} editUserSuccess`,
    props<{ user: IUser }>()
);

export const editUserFailure = createAction(
    `${namescapce} editUserFailure`,
    props<{ error: any}>()
);