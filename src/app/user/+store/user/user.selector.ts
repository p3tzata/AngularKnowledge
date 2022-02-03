import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserState } from "..";

const userModuleSelector = createFeatureSelector<IUserState>('user')


 const selectUserList = createSelector(
    userModuleSelector,
    state => state.list
);

export const selectUserListUsers = createSelector(selectUserList, s => s.users);