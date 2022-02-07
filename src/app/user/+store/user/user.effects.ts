import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from "../../shared/service/user.service";
import { deleteUser, deleteUserFailure, deleteUserSuccess, loadUserFailure, loadUsers, loadUserSuccess } from "./user.action";

@Injectable()
export class UserListEffects {

    loadUsers = createEffect(() => this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() => this.userService.loadUsers().pipe(
            map(users => loadUserSuccess({ users })),
            catchError(error => [loadUserFailure({ error })]))
        ))
    );

    deleteUser = createEffect(() => this.actions$.pipe(
        ofType(deleteUser),
        switchMap((actions) => this.userService.deleteUser(actions.name).pipe(
            map(() => deleteUserSuccess({ name: actions.name })),
            catchError((error) => of(deleteUserFailure({ error: error })))
        ))
    ));

    constructor(private actions$: Actions,
        private userService: UserService) { }
}
