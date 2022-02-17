
import { Update, } from "@ngrx/entity/src/models";
import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";

const namescapce = '[USER]';

export const cancel = createAction(
    `${namescapce} cancel`
);

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


export const getSingle = createAction(
    `${namescapce} getSingle`,
    props<{ id: number }>()
);

export const getSingleSuccess = createAction(
    `${namescapce} getSingleSuccess`,
    props<{ users: IUser }>()
);

export const getSingleFailure = createAction(
    `${namescapce} getSingleFailure`,
    props<{ error: Error }>()
);

export const getSingleCancel = createAction(
    `${namescapce} getSingleCancel`
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
    props<{update: IUser}>()
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

export const editInline = createAction(
    `${namescapce} edit inline`,
    props<{update: IUser[]}>()
);

export const editInlineSuccess = createAction(
    `${namescapce} edit inline success`,
    props<{update: IUser[]}>()
);

export const editInlineFail = createAction(
    `${namescapce} edit inline Failure`,
    props<{ error: any}>()
);

export const editInlineCancel = createAction(
    `${namescapce} edit inline cancel`
);



export const tryOpenEditSingleRowDialogSignal = createAction(
    `${namescapce} tryOpenEditSingleRowDialogSignal`,
    props<{ id: number}>()
);

export const openEditSingleRowDialogSignal = createAction(
    `${namescapce} openEditSingleRowDialogSignal`,
    props<{ data: IUser}>()
);

export const closeEditSingleRowDialogSignal = createAction(
    `${namescapce} closeEditSingleRowDialogSignal`    
);