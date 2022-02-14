import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from "../../shared/service/user.service";
import * as userAction from "./user.action";
import * as userEntityAction from './user.entity.action';
import * as toastrAction from '../../../+store/toastr/toastr.action'
import {SpinnerService} from '../../../core/shared/service/spinner.service'
@Injectable()
export class UserListEffects {

    constructor(private actions$: Actions,
        private userService: UserService,
        private spinnerService: SpinnerService
        ) { }


    load = createEffect(() => this.actions$.pipe(
        ofType(userAction.load),
        switchMap ( (param) => { 
            this.spinnerService.show();
            return this.userService.loadUsers().pipe(
            //tap()
            takeUntil(this.actions$.pipe(ofType(userAction.loadCancel))),
            switchMap((x)=>{ this.spinnerService.hide(); return [toastrAction.showSuccess({title: 'success title',message:"load complited"}),userEntityAction.loadEntities({entities: x}) ] }   ),
            catchError((err)=>{this.spinnerService.hide(); return [toastrAction.showFail({title: 'fail title',message: err.message})] } ),
            
            ) })

        )
        
    );
   
    delete = createEffect(() => this.actions$.pipe(
        ofType(userAction.delete_),
        switchMap ( (param) => this.userService.deleteUser(param.id).pipe(
            takeUntil(this.actions$.pipe(ofType(userAction.deleteCancel))),
            switchMap((x)=>[toastrAction.showSuccess({title: 'Delete',message:"Item is deleted!!!"}),
                            userEntityAction.deleteEntity({ id: param.id })]  ),
            catchError((err)=> [toastrAction.showFail({title: 'Fail Deleted',message: err.message})] ) 
            ))
        
        
    ));

    edit = createEffect(() => this.actions$.pipe(
        ofType(userAction.edit),
        switchMap ( (param) => this.userService.editUser(param.update).pipe(
            takeUntil(this.actions$.pipe(ofType(userAction.editCancel))),
            switchMap((x)=>[toastrAction.showSuccess({title: 'Edit',message:"Item is edited!!!"}),
                            userEntityAction.updateEntity({update: param.update})]  ),
            catchError((err)=> [toastrAction.showFail({title: 'Fail Edit',message: err.message})] ) 
            ))

    ));
   
}
