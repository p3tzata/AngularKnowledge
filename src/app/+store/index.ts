import { IUserModuleState } from "../user/+store";

export interface IAppState {
    readonly userModule: IUserModuleState;
}