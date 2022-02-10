import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ActionReducerMap } from "@ngrx/store";
import { IUser } from "../shared/interface/user";
import { userEntityReducer } from "./user/user.reducer";

export interface IUserModuleState {
    readonly userEntity: IUserEntity;
}

export const reducers: ActionReducerMap<IUserModuleState> = {

    userEntity: userEntityReducer
}

export interface IUserEntity extends EntityState<IUser> {
    selectedUserId: string | number | null;
}





