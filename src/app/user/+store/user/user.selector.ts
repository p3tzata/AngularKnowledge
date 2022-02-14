import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserModuleState } from "..";
import {userAdapter} from "./user.reducer"
const userModuleSelector = createFeatureSelector<IUserModuleState>('userModule')

/*
 const selectUserList = createSelector(
    userModuleSelector,
    state => state.user
);
export const selectUserListUsers = createSelector(selectUserList, s => s.list);
*/



export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = userAdapter.getSelectors();
   
