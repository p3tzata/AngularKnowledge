import { IUserModuleState } from "../user/+store";

export interface IAppState {
    readonly global: {showSpinner: boolean; showDialogSpinner: boolean};
    readonly userModule: IUserModuleState | undefined;
    
}