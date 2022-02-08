import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from "../../shared/service/user.service";
import { deleteUser, deleteUserFailure, deleteUserSuccess, editUser, editUserFailure, editUserSuccess, loadUserFailure, loadUsers, loadUserSuccess } from "./user.action";

@Injectable()
export class UserListEffects {

    loadUsers = createEffect(() => this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() => this.userService.loadUsers().pipe(
            map(users => loadUserSuccess({ users })),
            catchError(error => [loadUserFailure({ error })]))
        ))
    );
    //8:46 - 9:12
    deleteUser = createEffect(() => this.actions$.pipe(
        ofType(deleteUser),
        switchMap((actions) => this.userService.deleteUser( actions.id ).pipe(
            map(() => deleteUserSuccess({ id: actions.id })),
            catchError((error) => of(deleteUserFailure({ error: error })))
        ))
    ));

    //11 - 
    editUser = createEffect(() => this.actions$.pipe(
        ofType(editUser),
        switchMap((actions) => this.userService.editUser( actions.user ).pipe(
            map(() => editUserSuccess({ user: actions.user })),
            catchError((error) => of(editUserFailure({ error: error })))
        ))
    ));
    constructor(private actions$: Actions,
        private userService: UserService) { }
}
