import { EntityMap, EntityMapOne, Predicate, Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IUser } from "../../shared/interface/user";

const namescapce = '[USER]';


export const loadUsers = createAction(
    `${namescapce} loadUsers`
);

export const loadUserSuccess = createAction(
    `${namescapce} loadUsersSuccess`,
    props<{ users: IUser[] }>()
);

export const loadUserFailure = createAction(
    `${namescapce} loadUsersFailure`,
    props<{ error: Error }>()
);

export const deleteUser = createAction(
    `${namescapce} deleteUser`,
    props<{ id: number }>()
); 

export const deleteUserSuccess = createAction(
    `${namescapce} deleteUserSuccess`,
    props<{ id: number }>()
);

export const deleteUserFailure = createAction(
    `${namescapce} deleteUserFailure`,
    props<{ error: any}>()
);

export const editUser = createAction(
    `${namescapce} edit user`,
    props<{ user: IUser}>()
);

export const editUserSuccess = createAction(
    `${namescapce} editUserSuccess`,
    props<{ user: IUser }>()
);

export const editUserFailure = createAction(
    `${namescapce} editUserFailure`,
    props<{ error: any}>()
);

const namescapceEntity = '[UserEntity/API]'
export const loadUserEntities = createAction(`${namescapceEntity} Load UserEntities`, props<{ userEntities: IUser[] }>());
export const setUserEntities = createAction(`${namescapceEntity} Set UserEntities`, props<{ userEntities: IUser[] }>());
export const addUserEntity = createAction(`${namescapceEntity} Add UserEntity`, props<{ userEntity: IUser }>());
export const setUserEntity = createAction(`${namescapceEntity} Set UserEntity`, props<{ userEntity: IUser }>());
export const upsertUserEntity = createAction(`${namescapceEntity} Upsert UserEntity`, props<{ userEntity: IUser }>());
export const addUserEntities = createAction(`${namescapceEntity} Add UserEntities`, props<{ userEntities: IUser[] }>());
export const upsertUserEntities = createAction(`${namescapceEntity} Upsert UserEntities`, props<{ userEntities: IUser[] }>());
export const updateUserEntity = createAction(`${namescapceEntity} Update UserEntity`, props<{ update: Update<IUser> }>());
export const updateUserEntities = createAction(`${namescapceEntity} Update UserEntities`, props<{ updates: Update<IUser>[] }>());
export const mapUserEntity = createAction(`${namescapceEntity} Map UserEntity`, props<{ entityMap: EntityMapOne<IUser> }>());
export const mapUserEntities = createAction(`${namescapceEntity} Map UserEntities`, props<{ entityMap: EntityMap<IUser> }>());
export const deleteUserEntity = createAction(`${namescapceEntity} Delete UserEntity`, props<{ id: string  }>());
export const deleteUserEntities = createAction(`${namescapceEntity} Delete UserEntities`, props<{ ids: string[] }>());
export const deleteUserEntitiesByPredicate = createAction(`${namescapceEntity} Delete UserEntities By Predicate`, props<{ predicate: Predicate<IUser> }>());
export const clearUserEntities = createAction(`${namescapceEntity} Clear UserEntities`);
