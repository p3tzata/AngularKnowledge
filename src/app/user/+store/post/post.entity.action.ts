import { createAction, props } from "@ngrx/store";
import { EntityMap, EntityMapOne, Predicate, Update } from "@ngrx/entity";
import { IPost } from "../../shared/interface";

const namescapceEntity = '[POST/EntityAPI]'
export const loadEntities = createAction(`${namescapceEntity} Load Entities`, props<{ entities: IPost[] }>());
export const setEntities = createAction(`${namescapceEntity} Set Entities`, props<{ entities: IPost[] }>());
export const addEntity = createAction(`${namescapceEntity} Add Entity`, props<{ entity: IPost }>());
export const setEntity = createAction(`${namescapceEntity} Set Entity`, props<{ entity: IPost }>());
export const upsertEntity = createAction(`${namescapceEntity} Upsert Entity`, props<{ entity: IPost }>());
export const addEntities = createAction(`${namescapceEntity} Add Entities`, props<{ entities: IPost[] }>());
export const upsertEntities = createAction(`${namescapceEntity} Upsert Entities`, props<{ entities: IPost[] }>());
export const updateEntity = createAction(`${namescapceEntity} Update Entity`, props<{ update: Update<IPost> }>());
export const updateEntities = createAction(`${namescapceEntity} Update Entities`, props<{ updates: Update<IPost>[] }>());
export const mapEntity = createAction(`${namescapceEntity} Map Entity`, props<{ entityMap: EntityMapOne<IPost> }>());
export const mapEntities = createAction(`${namescapceEntity} Map Entities`, props<{ entityMap: EntityMap<IPost> }>());
export const deleteEntity = createAction(`${namescapceEntity} Delete Entity`, props<{ id: number  }>());
export const deleteEntities = createAction(`${namescapceEntity} Delete Entities`, props<{ ids: string[] }>());
export const deleteEntitiesByPredicate = createAction(`${namescapceEntity} Delete Entities By Predicate`, props<{ predicate: Predicate<IPost> }>());
export const clearEntities = createAction(`${namescapceEntity} Clear Entities`);