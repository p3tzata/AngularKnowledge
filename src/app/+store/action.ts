import { createAction, props } from "@ngrx/store";


const namescapce = '[GLOBAL]';


export const showSpinner = createAction(
    `${namescapce} showSpinner`
);

export const hideSpinner = createAction(
    `${namescapce} hideSpinner`
);