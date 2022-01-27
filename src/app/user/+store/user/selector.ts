import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserState } from ".";

const userModuleSelector = createFeatureSelector<IUserState>('user')


export const selectUserList = createSelector(
    userModuleSelector,
    state => state.list
);

export const selectUserListUsers = createSelector(
    selectUserList,
    state => state.users
);