import { createReducer, State } from "@ngrx/store";
import {  on } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";

import {IUserEntity} from '../'
import * as userActions from './user.action';
import * as userEntityActions from './user.entity.action';

import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export interface IUserListState {
    readonly list: IUser[] ;
};


const initialState: IUserListState =  {
   
    list: []
};




export function selectUserId(a: IUser): number {
    return a.id;
  }

  export function sortByName(a: IUser, b: IUser): number {
    return a.name.localeCompare(b.name);
  }

export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
    selectId: selectUserId,
    sortComparer: sortByName,
  });

export const initialIUserEntityState: IUserEntity = userAdapter.getInitialState({
    // additional entity state properties
    selectedUserId: null,

  });

  
  
  export const userEntityReducer = createReducer(
    initialIUserEntityState,
    on(userEntityActions.addEntity, (state, { entity }) => {
      return userAdapter.addOne(entity, state)
    }),
    on(userEntityActions.setEntity, (state, { entity }) => {
      return userAdapter.setOne(entity, state)
    }),
    on(userEntityActions.upsertEntity, (state, { entity }) => {
      return userAdapter.upsertOne(entity, state);
    }),
    on(userEntityActions.addEntities, (state, { entities }) => {
      return userAdapter.addMany(entities, state);
    }),
    on(userEntityActions.upsertEntities, (state, { entities }) => {
      return userAdapter.upsertMany(entities, state);
    }),
    on(userEntityActions.updateEntity, (state, { update }) => {
      return userAdapter.updateOne(update, state);
    }),
    on(userEntityActions.updateEntities, (state, { updates }) => {
      return userAdapter.updateMany(updates, state);
    }),
    on(userEntityActions.mapEntity, (state, { entityMap }) => {
      return userAdapter.mapOne(entityMap, state);
    }),
    on(userEntityActions.mapEntities, (state, { entityMap }) => {
      return userAdapter.map(entityMap, state);
    }),
    on(userEntityActions.deleteEntity, (state, { id }) => {
      return userAdapter.removeOne(id, state);
    }),
    on(userEntityActions.deleteEntities, (state, { ids }) => {
      return userAdapter.removeMany(ids, state);
    }),
    on(userEntityActions.deleteEntitiesByPredicate, (state, { predicate }) => {
      return userAdapter.removeMany(predicate, state);
    }),
    on(userEntityActions.loadEntities, (state, { entities }) => {
        return userAdapter.setAll(entities, state);
    }),
    /*
    on(EntityActions.setEntities, (state, { userEntities }) => {
      return userAdapter.setMany(userEntities, state);
    }),
    */
    on(userEntityActions.clearEntities, state => {
      return userAdapter.removeAll({ ...state, selectedEntityId: null });
    })
  );
