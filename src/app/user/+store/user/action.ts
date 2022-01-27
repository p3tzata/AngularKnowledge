import { createAction, props } from "@ngrx/store";

const namescapce = '[USER]';


export const loadUsers = createAction(
    `${namescapce} loadUsersSuccess`,
);

export const loadUserFailure = createAction(
    `${namescapce} loadUsersFailure`,
    props<{ error: Error }>()
);