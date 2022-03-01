import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ActionReducerMap } from "@ngrx/store";
import { IUser,IPost } from "../shared/interface/";
import { userEntityReducer } from "./user/user.reducer";
import { postEntityReducer } from "./post/post.reducer";

export interface IUserModuleState {
    readonly userEntity: IUserEntity;
    readonly postEntity: IPostEntity
}

export const reducers: ActionReducerMap<IUserModuleState> = {

    userEntity: userEntityReducer,
    postEntity: postEntityReducer
}

export interface IUserEntity extends EntityState<IUser> {
    selectedUserId: string | number | null;    
}

export interface IPostEntity extends EntityState<IPost> {
    selectedPostId: string | number | null;    
}





