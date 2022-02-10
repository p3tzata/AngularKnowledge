
import { Update, } from "@ngrx/entity/src/models";
import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";

const namescapce = '[USER]';


export const load = createAction(
    `${namescapce} load`
);

export const loadSuccess = createAction(
    `${namescapce} loadSuccess`,
    props<{ users: IUser[] }>()
);

export const loadFailure = createAction(
    `${namescapce} loadFailure`,
    props<{ error: Error }>()
);

export const loadCancel = createAction(
    `${namescapce} loadCancel`
);


export const delete_ = createAction(
    `${namescapce} delete`,
    props<{ id: number }>()
); 

export const deleteSuccess = createAction(
    `${namescapce} deleteSuccess`,
    props<{ id: number }>()
);

export const deleteFailure = createAction(
    `${namescapce} deleteFailure`,
    props<{ error: any}>()
);

export const deleteCancel = createAction(
    `${namescapce} deleteCancel`
);

export const edit = createAction(
    `${namescapce} edit`,
    props<{update: Update<IUser>}>()
);

export const editCancel = createAction(
    `${namescapce} editCancel`,
  
);

export const editSuccess = createAction(
    `${namescapce} editSuccess`,
    props<{ user: IUser }>()
);

export const editFailure = createAction(
    `${namescapce} editFailure`,
    props<{ error: any}>()
);


