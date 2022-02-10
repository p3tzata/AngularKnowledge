import { createAction, props } from "@ngrx/store";
import { EntityMap, EntityMapOne, Predicate, Update } from "@ngrx/entity";
import { IUser } from "../../shared/interface/user";

const namescapceEntity = '[UserEntity/API]'
export const loadEntities = createAction(`${namescapceEntity} Load Entities`, props<{ entities: IUser[] }>());
export const setEntities = createAction(`${namescapceEntity} Set Entities`, props<{ entities: IUser[] }>());
export const addEntity = createAction(`${namescapceEntity} Add Entity`, props<{ entity: IUser }>());
export const setEntity = createAction(`${namescapceEntity} Set Entity`, props<{ entity: IUser }>());
export const upsertEntity = createAction(`${namescapceEntity} Upsert Entity`, props<{ entity: IUser }>());
export const addEntities = createAction(`${namescapceEntity} Add Entities`, props<{ entities: IUser[] }>());
export const upsertEntities = createAction(`${namescapceEntity} Upsert Entities`, props<{ entities: IUser[] }>());
export const updateEntity = createAction(`${namescapceEntity} Update Entity`, props<{ update: Update<IUser> }>());
export const updateEntities = createAction(`${namescapceEntity} Update Entities`, props<{ updates: Update<IUser>[] }>());
export const mapEntity = createAction(`${namescapceEntity} Map Entity`, props<{ entityMap: EntityMapOne<IUser> }>());
export const mapEntities = createAction(`${namescapceEntity} Map Entities`, props<{ entityMap: EntityMap<IUser> }>());
export const deleteEntity = createAction(`${namescapceEntity} Delete Entity`, props<{ id: number  }>());
export const deleteEntities = createAction(`${namescapceEntity} Delete Entities`, props<{ ids: string[] }>());
export const deleteEntitiesByPredicate = createAction(`${namescapceEntity} Delete Entities By Predicate`, props<{ predicate: Predicate<IUser> }>());
export const clearEntities = createAction(`${namescapceEntity} Clear Entities`);