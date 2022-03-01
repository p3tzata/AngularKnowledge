
import { createAction, props } from "@ngrx/store";
import { IPost } from "../../shared/interface/";


const namescapce = '[POST]';

export const cancel = createAction(
    `${namescapce} cancel`
);


export const delete_ = createAction(
    `${namescapce} delete`,
    props<{ id: number }>()
); 

export const edit = createAction(
    `${namescapce} edit`,
    props<{payload: IPost}>()
);

export const new_ = createAction(
    `${namescapce} new_`,
    props<{payload: IPost}>()
);

export const editInline = createAction(
    `${namescapce} edit inline`,
    props<{payload: IPost[]}>()
);

export const tryOpenLinesSignal = createAction(
    `${namescapce} tryOpenLinesSignal`,
    props<{payload: number}>()
);