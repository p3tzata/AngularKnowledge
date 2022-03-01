
import { Update, } from "@ngrx/entity/src/models";
import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";
import { IUserSearchForm } from "../../shared/interface/userSearchForm";

const namescapce = '[USER]';

export const cancel = createAction(
    `${namescapce} cancel`
);

export const load = createAction(
    `${namescapce} load`
);

export const setSelected = createAction(
    `${namescapce} setSelected`,
    props<{ payload: number }>()
);



export const searchForm = createAction(
    `${namescapce} searchForm`,
    props<{ payload: IUserSearchForm }>()
);

export const delete_ = createAction(
    `${namescapce} delete`,
    props<{ id: number }>()
); 

export const edit = createAction(
    `${namescapce} edit`,
    props<{payload: IUser}>()
);

export const new_ = createAction(
    `${namescapce} new_`,
    props<{payload: IUser}>()
);

export const editInline = createAction(
    `${namescapce} edit inline`,
    props<{payload: IUser[]}>()
);

export const tryOpenLinesSignal = createAction(
    `${namescapce} tryOpenLinesSignal`,
    props<{payload: number}>()
);

export const оpenLinesТabSignal = createAction(
    `${namescapce} оpenLinesТabSignal`
);

