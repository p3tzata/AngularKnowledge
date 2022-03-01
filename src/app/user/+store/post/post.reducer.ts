import { createReducer, State } from "@ngrx/store";
import {  on } from "@ngrx/store";

import {IPostEntity} from '..'
import * as postEntityActions from './post.entity.action'
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { IPost } from "../../shared/interface";



export function selectPostId(a: IPost): number {
    return a.id;
  }

  export function sortByName(a: IPost, b: IPost): number {
    return a.title.localeCompare(b.title);
  }

export const postAdapter: EntityAdapter<IPost> = createEntityAdapter<IPost>({
    selectId: selectPostId,
    sortComparer: sortByName,
  });

export const initialIPostEntityState: IPostEntity = postAdapter.getInitialState({
    // additional entity state properties
    selectedPostId: null,

  });

  
  
  export const postEntityReducer = createReducer(
    initialIPostEntityState,
    on(postEntityActions.addEntity, (state, { entity }) => {
      return postAdapter.addOne(entity, state)
    }),
    on(postEntityActions.setEntity, (state, { entity }) => {
      return postAdapter.setOne(entity, state)
    }),
    on(postEntityActions.upsertEntity, (state, { entity }) => {
      return postAdapter.upsertOne(entity, state);
    }),
    on(postEntityActions.addEntities, (state, { entities }) => {
      return postAdapter.addMany(entities, state);
    }),
    on(postEntityActions.upsertEntities, (state, { entities }) => {
      return postAdapter.upsertMany(entities, state);
    }),
    on(postEntityActions.updateEntity, (state, { update }) => {
      return postAdapter.updateOne(update, state);
    }),
    on(postEntityActions.updateEntities, (state, { updates }) => {
      return postAdapter.updateMany(updates, state);
    }),
    on(postEntityActions.mapEntity, (state, { entityMap }) => {
      return postAdapter.mapOne(entityMap, state);
    }),
    on(postEntityActions.mapEntities, (state, { entityMap }) => {
      return postAdapter.map(entityMap, state);
    }),
    on(postEntityActions.deleteEntity, (state, { id }) => {
      return postAdapter.removeOne(id, state);
    }),
    on(postEntityActions.deleteEntities, (state, { ids }) => {
      return postAdapter.removeMany(ids, state);
    }),
    on(postEntityActions.deleteEntitiesByPredicate, (state, { predicate }) => {
      return postAdapter.removeMany(predicate, state);
    }),
    on(postEntityActions.loadEntities, (state, { entities }) => {
        return postAdapter.setAll(entities, state);
    }),
    /*
    on(EntityActions.setEntities, (state, { userEntities }) => {
      return postAdapter.setMany(userEntities, state);
    }),
    */
    on(postEntityActions.clearEntities, state => {
      return postAdapter.removeAll({ ...state, selectedEntityId: null });
    })
  );
