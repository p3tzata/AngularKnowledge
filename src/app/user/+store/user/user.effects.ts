import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UserService } from "../../shared/service/user.service";
import * as userAction from "./user.action";
import * as userDialogAction from "./user.dialog.action";
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
            takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
            switchMap((x)=>{ this.spinnerService.hide(); return [userEntityAction.loadEntities({entities: x}) ] }   ),
            catchError((err)=>{this.spinnerService.hide(); return [toastrAction.showFail({title: 'fail title',message: err.message})] } ),
            
            ) })

        )
        
    );
   
    delete = createEffect(() => this.actions$.pipe(
        ofType(userAction.delete_),
        switchMap ( (param) => 
            {this.spinnerService.show();
            return this.userService.deleteUser(param.id).pipe(
            takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
            switchMap((x)=>{this.spinnerService.hide();
                            return [userDialogAction.closeDialogSignal(),
                                    toastrAction.showSuccess({title: 'Delete',message:"Item is deleted!!!"}),
                                    userEntityAction.deleteEntity({ id: param.id })] } ),
            catchError((err)=> {this.spinnerService.hide();
                                return [toastrAction.showFail({title: 'Fail Deleted',message: err.message})] } ) 
            ) })
        
        
    ));

    edit = createEffect(() => this.actions$.pipe(
        ofType(userAction.edit),
        switchMap ( (param) => {
            this.spinnerService.show();
            return this.userService.editUser(param.update).pipe(
            takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
            switchMap((x)=>{
                            this.spinnerService.hide();
                            return [userDialogAction.closeDialogSignal(),
                            toastrAction.showSuccess({title: 'Edit',message:"Item is edited!"}),
                            userEntityAction.updateEntity({update: {id: param.update.id, changes: param.update }})] }  ),
            catchError((err)=> {
                            this.spinnerService.hide();
                            return [toastrAction.showFail({title: 'Fail Edit',message: err.message})] } ) 
            ) }  )

    ));

    
    editEntitiesInline = createEffect( ()=> this.actions$.pipe(
        ofType(userAction.editInline),
        switchMap( (param) =>{
                this.spinnerService.show();
                return this.userService.editInline(param.update).pipe(
                takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
                switchMap( (x)=> {this.spinnerService.hide();
                                  return [
                                         userDialogAction.closeDialogSignal(),
                                         toastrAction.showSuccess({title: "Edit Inline",message:"Itmes are edited!!!!"}),
                                         userEntityAction.updateEntities({updates: x.map( (x)=>{return {id:x.id,changes:x} } ) })
                                         ]}),
                catchError((err)=>{this.spinnerService.hide();
                    return [toastrAction.showFail({title: 'Fail Edit',message: err.message})] }) 
                  ) })

    ));        



 tryOpenEditSingleRowDialogSignal = createEffect( ()=> this.actions$.pipe(
    ofType(userDialogAction.tryOpenEditSingleRowDialogSignal),
    switchMap( (param) =>{
        this.spinnerService.show();
        return this.userService.getDataForEditDialog(param.id).pipe(
        takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
        switchMap( (x)=> {this.spinnerService.hide();
                          
                          return [userDialogAction.openEditSingleRowDialogSignal({payload: x})
                                 ]}),
        catchError((err)=>{this.spinnerService.hide();
            return [toastrAction.showFail({title: 'Fail Edit',message: err.message})] }) 
          ) })
 ))

 tryOpenNewRowDialogSignal = createEffect( ()=> this.actions$.pipe(
    ofType(userDialogAction.tryOpenNewRowDialogSignal),
    switchMap( (param) =>{
        this.spinnerService.show();
        return this.userService.getNeededDataForNewRow().pipe(
        takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
        switchMap( (x)=> {this.spinnerService.hide();
                          return [userDialogAction.openNewRowDialogSignal({payload: x})
                                 ]}),
        catchError((err)=>{this.spinnerService.hide();
            return [toastrAction.showFail({title: 'Fail Edit',message: err.message})] }) 
          ) })
 ))


 new_ = createEffect(() => this.actions$.pipe(
    ofType(userAction.new_),
    switchMap ( (param) => {
        this.spinnerService.show();
        return this.userService.new_(param.insert).pipe(
        takeUntil(this.actions$.pipe(ofType(userAction.cancel))),
        switchMap((x)=>{
                        this.spinnerService.hide();
                        return [userDialogAction.closeDialogSignal(),
                        toastrAction.showSuccess({title: 'Inserted',message:"Item is inserted!"}),
                        userEntityAction.addEntity({entity: x})] }  ),
        catchError((err)=> {
                        this.spinnerService.hide();
                        return [toastrAction.showFail({title: 'Fail Edit',message: err.message})] } ) 
        ) }  )

));




   
}
