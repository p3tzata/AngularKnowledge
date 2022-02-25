import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter'


@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {

    getFirstDayOfWeek(): number {
        return 1;
    }

}






export const MAT_DATE_FORMATS_dd_mm_yyyy = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

