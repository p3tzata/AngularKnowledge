import { AbstractControl, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import * as const_ from "../constant/tabIndexConstant"

export function generateTabIndexSchema_(el: {[key:string]: string} ): {[key:string]: number} {
    let result:{[key:string]: number}={};
    let i=0;
    for (let key in el) {
        
        result[key]=(i++)*const_.TAB_INDEX_OFFSET;
        
    }

    return result;

}


export function generateTabIndexSchema(el: {[key:string]: string} ): [{[key:string]: number}, number]  {
    let result:{[key:string]: number}={};
    let ix=0;
    for (let key in el) {
        
        result[key]=(ix++)*const_.TAB_INDEX_OFFSET;
        
    }

     return [result,(ix-1)*const_.TAB_INDEX_OFFSET]  ;

}














