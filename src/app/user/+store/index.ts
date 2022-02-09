import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ActionReducerMap } from "@ngrx/store";
import { IUser } from "../shared/interface/user";
import { IUserListState, userListReducer,userEntityReducer } from "./user/user.reducer";

export interface IUserModuleState {
    readonly user: IUserListState;
    readonly userEntity: IUserEntity;
}

export const reducers: ActionReducerMap<IUserModuleState> = {
    user: userListReducer,
    userEntity: userEntityReducer
}

export interface IUserEntity extends EntityState<IUser> {
    selectedUserId: string | number | null;
}

  export function selectUserId(a: IUser): number {
    return a.id;
  }

  export function sortByName(a: IUser, b: IUser): number {
    return a.name.localeCompare(b.name);
  }

  export const IUserAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
    selectId: selectUserId,
    sortComparer: sortByName,
  });

