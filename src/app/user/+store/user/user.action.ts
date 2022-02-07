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
    props<{ name: string}>()
); 

export const deleteUserSuccess = createAction(
    `${namescapce} deleteUserSuccess`,
    props<{ name: string }>()
);

export const deleteUserFailure = createAction(
    `${namescapce} deleteUserFailure`,
    props<{ error: any}>()
);

export const editUser = createAction(
    `${namescapce} edit user`,
    props<{ name: string}>()
);

export const editUserSuccess = createAction(
    `${namescapce} editUserSuccess`,
    props<{ name: string}>()
);

export const editUserFailure = createAction(
    `${namescapce} editUserFailure`,
    props<{ error: any}>()
);