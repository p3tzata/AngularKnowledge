import {IAppState} from './index'


 export const spinnerSelector= (state:IAppState) => state.global.showSpinner;
 export const spinnerDialogSelector= (state:IAppState) => state.global.showDialogSpinner; 
  
