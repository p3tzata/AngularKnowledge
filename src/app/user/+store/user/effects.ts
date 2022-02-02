import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { catchError, map } from 'rxjs/operators';
import { UserService } from "../../shared/service/user.service";
import {  loadUserFailure, loadUserSuccess } from "./action";

@Injectable()
export class UserListEffects {
    
    loadUsers = createEffect(() => this.ations$.pipe(
        () => this.userService.loadUsers().pipe(
            map(users => loadUserSuccess({ users })),
            catchError(error => [loadUserFailure({ error })])
        )
    ))

    constructor(private ations$: Actions,
        private userService: UserService) { }
}
