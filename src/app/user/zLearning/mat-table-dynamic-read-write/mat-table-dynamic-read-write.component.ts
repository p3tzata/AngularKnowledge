import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  Store } from '@ngrx/store';
import { IAppState } from '../../../+store';
import * as globalSelector from '../../../+store/selector'
import { IUser } from '../../shared/interface/user';
import * as userSelector from '../../+store/user/user.selector'
import * as userAction from '../../+store/user/user.action';
import * as userDialogAction from '../../+store/user/user.dialog.action';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Actions, ofType } from '@ngrx/effects';
import * as toastrAction from '../../../+store/toastr/toastr.action'
import * as util from '../../../core/shared/util/util'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../core/shared/dialog/confirm-dialog/confirm-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {ColorThemeEnum} from '../../../core/shared/constant/globalEnum'
import { EditDialogComponent } from '../../dialog/edit-dialog/edit-dialog.component';
import { NewDialogComponent } from '../../dialog/new-dialog/new-dialog.component';

@Component({
  selector: 'app-mat-table-dynamic-read-write',
  templateUrl: './mat-table-dynamic-read-write.component.html',
  styleUrls: ['./mat-table-dynamic-read-write.component.css']
})
export class MatTableDynamicReadWriteComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<IUser>(true, []);
  tabIndex=1;
  maxTabIndexOffset!:number;
  dataSource!: MatTableDataSource<IUser>;
  dataSchema!:{[key:string]: string};
  tabIndexSchema!:{[key:string]: number};
  spinner$!:Observable<boolean>;
  killSubscribtion = new Subject();
  displayedColumnsLoop!:Array<string> // = ["id","username","name", "email"];
  displayedColumns!:Array<string>// = ["checkbox","id","username","name", "email"];
  dataFromDialog: any;
  //displayedColumns = ["checkbox",this.displayedColumnsLoop];
  dialogRef!:MatDialogRef<any,any>;
  TABLE_SCHEMA = {
    //"id": "number",
    "username": "text",
    "name" : "text",
    "email": "text",
  }
  
  inlineEdited:{[key:number] : IUser }={};


  constructor(private store: Store<IAppState>, 
              private actions$:Actions,
              private dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer) { 
    this.displayedColumnsLoop = ["id","username","name", "email"];
    let allColumns: string[][] = [['checkbox'],this.displayedColumnsLoop,['editSingleRow','popUpMenu']  ] 
    
    this.displayedColumns=allColumns.flat();
      
  }

    ngOnInit(): void {
      this.dataSchema=this.TABLE_SCHEMA;
      [this.tabIndexSchema,this.maxTabIndexOffset]=util.generateTabIndexSchema(this.dataSchema);
      
    this.spinner$=this.store.select((x)=>{ return globalSelector.spinnerSelector(x)});
   
    this.store.dispatch(userAction.load());
    this.store.select((x)=>userSelector.selectAll(x.userModule!.userEntity) ).pipe(takeUntil(this.killSubscribtion)).subscribe(users => { 
      this.dataSource = new MatTableDataSource<IUser>(Array.from(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.actions$.pipe(takeUntil(this.killSubscribtion), ofType(toastrAction.showSuccess)).subscribe( (_) => {
      this.selection.clear();
      this.inlineEdited={};
    });


    this.actions$.pipe(takeUntil(this.killSubscribtion), ofType(userDialogAction.openEditSingleRowDialogSignal)
      
    ).subscribe( (x) =>
      this.openEditSingleRowDialog( x.payload)
    )

    this.actions$.pipe(takeUntil(this.killSubscribtion), ofType(userDialogAction.openNewRowDialogSignal)
      
    ).subscribe( (x) =>
      this.openNewRowDialog( x.payload)
    )

    this.actions$.pipe(takeUntil(this.killSubscribtion), ofType(userDialogAction.closeDialogSignal)
      
    ).subscribe( (x) =>
      this.dialogRef.close()
    )

  }

//New

tryOpenNewRowDialog (){
  this.store.dispatch(userDialogAction.tryOpenNewRowDialogSignal());
}


openNewRowDialog(payload: boolean): void {
  this.dialogRef = this.dialog.open(NewDialogComponent,
   {
     data: {
       width: '550px',
       height: '550px',
       payload: payload,
     }
   }
 );
 
};

//New - end



//InlineEdit_
@HostListener('keydown', ['$event'])
onInput(e: any) {
  if (e.which==121) {
    this.confirmInlineEditDialog();
    e.preventDefault();
  }
}

  setInline(id:number, defaultRowValue:IUser, targetProp:any ,targetValue: any) {
    if (!this.inlineEdited[id]) {
      this.inlineEdited[id]=defaultRowValue;
    }
    this.inlineEdited[id] = {...this.inlineEdited[id],[targetProp]:targetValue }

  }

  updateRow(){
 
    let users = this.selection.selected.map((x) => this.inlineEdited[x.id] ).filter((x)=> x!=undefined)
    
    if (users.length>0) {
    
      this.store.dispatch(userAction.editInline({update: users}))

    } else {

      this.store.dispatch(toastrAction.showWarning({title:'Warning',message:'You did not edit any row(s)' }));
      
    }
    
  }

  
  confirmInlineEditDialog(): void {
    const message = `Are you sure you want to update row(s)?`;

    const dialogData = new ConfirmDialogModel("Confirm Update", message, "Update",ColorThemeEnum.primary);

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    this.dialogRef.componentInstance.onConfirmEmitter.pipe(takeUntil(this.killSubscribtion)).subscribe( ()=>
      this.updateRow()
    );
    
  }


//InlineEdit_ - end

//DeleteSingleRow
confirmDeleteSingleRowDialog(id: number, label: string): void {
  const message = `Are you sure you want to delete '${label}' ?`;

  const dialogData = new ConfirmDialogModel("Confirm Delete", message, "Delete",ColorThemeEnum.warn);

   this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  this.dialogRef.componentInstance.onConfirmEmitter.subscribe( ()=>
      this.deleteSingleRow(id)
  );


}

deleteSingleRow(id: number) {
  this.store.dispatch(userAction.delete_({ id }));
}

//DeleteSingleRow - end


//EditSingle row

tryOpenEditSingleRowDialog(id: number) {
  this.store.dispatch(userDialogAction.tryOpenEditSingleRowDialogSignal({id}));
}


openEditSingleRowDialog(payload: any): void {
  
   this.dialogRef = this.dialog.open(EditDialogComponent,
    {
      data: {
        width: '550px',
        height: '550px',
        payload: payload,
      }
    }
  );
  
};

//EditSingle row -end




//SelectCheckbox_
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  doSelect($event: any, element :any ) {
    //console.log($event)
    
    if ($event instanceof KeyboardEvent) {
      if ($event.key!="Tab"
          && $event.key!="Home" 
          && $event.key!="End"
          && $event.key!="Escape"
          && $event.key!="F2"
          && $event.key!="Enter"
          && $event.key!="ArrowRight" 
          && $event.key!="ArrowLeft" 
          && $event.key!="ArrowDown"
          && $event.key!="ArrowUp") {
        this.selection.select(element)
      }
    }
     
  }
//SelectCheckbox_ - end
//Sort_
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  //Sort_ - end

 







}
