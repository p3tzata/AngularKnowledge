import { IUserModuleState } from "../user/+store";

export interface IAppState {
    readonly global: {showSpinner: boolean};
    readonly userModule: IUserModuleState | undefined;
    
}