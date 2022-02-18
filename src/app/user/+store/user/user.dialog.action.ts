import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";

const namescapce = '[USER/dialog]';

export const tryOpenEditSingleRowDialogSignal = createAction(
    `${namescapce} tryOpenEditSingleRowDialogSignal`,
    props<{ id: number}>()
);

export const openEditSingleRowDialogSignal = createAction(
    `${namescapce} openEditSingleRowDialogSignal`,
    props<{ payload: any}>()
);

export const closeDialogSignal = createAction(
    `${namescapce} closeDialogSignal`    
);


export const tryOpenNewRowDialogSignal = createAction(
    `${namescapce} tryOpenNewRowDialogSignal`
);

export const openNewRowDialogSignal = createAction(
    `${namescapce} openNewRowDialogSignal`,
    props<{ payload: boolean}>()
);