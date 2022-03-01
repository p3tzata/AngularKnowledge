import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserModuleState } from "..";
import {postAdapter} from "./post.reducer"
const userModuleSelector = createFeatureSelector<IUserModuleState>('userModule')

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = postAdapter.getSelectors();
   
