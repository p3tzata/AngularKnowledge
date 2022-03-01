
import {AbstractControl, ValidationErrors} from '@angular/forms'

export function multiFieldTestValidator(control: AbstractControl): ValidationErrors | null {
    let nameValue = control.get('name')!.value 
    let dateStartValue = control.get('dateStart')!.value 
    
    if ( !(!!(nameValue) || !!(dateStartValue)) ){
         return { 'nameOrDateStart': true } 
    } else {
        return null
    }

}