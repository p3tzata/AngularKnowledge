import { createReducer, State } from "@ngrx/store";
import {  on } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";
import { deleteUserSuccess, editUserSuccess, loadUserSuccess } from "./user.action";
import {IUserEntity} from '../'
import * as UserEntityActions from './user.action';
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export interface IUserListState {
    readonly list: IUser[] ;
};


const initialState: IUserListState =  {
   
    list: []
};



export const userListReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { users }) => ({ ...state, list: users })),
    on(deleteUserSuccess, (state,  { id }) => {
        return {
            ...state,
            users: state.list.filter((user) => user.id !== id)
        }
    }),
    on(editUserSuccess, (state, { user }) => {
        const updatedUsers = state.list.map((u) => {
            return user.id === u.id ? user : u;
        })
        return {
            ...state,
            list: updatedUsers,
        }
    })
);

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

export const initialIUserEntityState: IUserEntity = IUserAdapter.getInitialState({
    // additional entity state properties
    selectedUserId: null,
  });

  
  
  export const userEntityReducer = createReducer(
    initialIUserEntityState,
    on(UserEntityActions.addUserEntity, (state, { userEntity }) => {
      return IUserAdapter.addOne(userEntity, state)
    }),
    on(UserEntityActions.setUserEntity, (state, { userEntity }) => {
      return IUserAdapter.setOne(userEntity, state)
    }),
    on(UserEntityActions.upsertUserEntity, (state, { userEntity }) => {
      return IUserAdapter.upsertOne(userEntity, state);
    }),
    on(UserEntityActions.addUserEntities, (state, { userEntities }) => {
      return IUserAdapter.addMany(userEntities, state);
    }),
    on(UserEntityActions.upsertUserEntities, (state, { userEntities }) => {
      return IUserAdapter.upsertMany(userEntities, state);
    }),
    on(UserEntityActions.updateUserEntity, (state, { update }) => {
      return IUserAdapter.updateOne(update, state);
    }),
    on(UserEntityActions.updateUserEntities, (state, { updates }) => {
      return IUserAdapter.updateMany(updates, state);
    }),
    on(UserEntityActions.mapUserEntity, (state, { entityMap }) => {
      return IUserAdapter.mapOne(entityMap, state);
    }),
    on(UserEntityActions.mapUserEntities, (state, { entityMap }) => {
      return IUserAdapter.map(entityMap, state);
    }),
    on(UserEntityActions.deleteUserEntity, (state, { id }) => {
      return IUserAdapter.removeOne(id, state);
    }),
    on(UserEntityActions.deleteUserEntities, (state, { ids }) => {
      return IUserAdapter.removeMany(ids, state);
    }),
    on(UserEntityActions.deleteUserEntitiesByPredicate, (state, { predicate }) => {
      return IUserAdapter.removeMany(predicate, state);
    }),
    on(UserEntityActions.loadUserEntities, (state, { userEntities }) => {
      return IUserAdapter.setAll(userEntities, state);
    }),
    /*
    on(UserEntityActions.setUserEntities, (state, { userEntities }) => {
      return IUserAdapter.setMany(userEntities, state);
    }),
    */
    on(UserEntityActions.clearUserEntities, state => {
      return IUserAdapter.removeAll({ ...state, selectedUserEntityId: null });
    })
  );
