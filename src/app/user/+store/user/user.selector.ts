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



const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = userAdapter.getSelectors();
   
  // select the array of user ids
  export const selectUserIds = selectIds;
   
  // select the dictionary of user entities
  export const selectUserEntities = selectEntities;
   
  // select the array of users
  export const selectAllUsers = selectAll;
   
  // select the total user count
  export const selectUserTotal = selectTotal;