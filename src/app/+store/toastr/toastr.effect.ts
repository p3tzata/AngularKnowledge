import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";

import {ToastrService} from 'ngx-toastr'

import { map } from "rxjs/operators";
import * as toastrAction from './toastr.action'

@Injectable(
    {providedIn:'root'}
)
export class ToastrEffect {
    constructor(private action$:Actions,private toastrSrv: ToastrService){
        
    }

    showSuccessEffect = createEffect(()=>this.action$.pipe(ofType(toastrAction.showSuccess),
    map( (action) => {
        //debugger;
        this.toastrSrv.success(action.message,action.title);
        
    })),{dispatch:false});

    
    showFailEffect = createEffect(()=>this.action$.pipe(ofType(toastrAction.showFail),
    map( (action) => {
        
        this.toastrSrv.error(action.message,action.title);
        
    })),{ dispatch: false });



   


    


}


