import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserModuleState } from "..";

const userModuleSelector = createFeatureSelector<IUserModuleState>('userModule')


 const selectUserList = createSelector(
    userModuleSelector,
    state => state.user
);

export const selectUserListUsers = createSelector(selectUserList, s => s.list);