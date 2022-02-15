import { RouterModule, Routes } from "@angular/router";
import { UserGridComponent } from "./user-grid/user-grid.component";
import { MatTable1Component } from "./zLearning/mat-table1/mat-table1.component";
import { MatTableDynamicReadWriteComponent } from "./zLearning/mat-table-dynamic-read-write/mat-table-dynamic-read-write.component";


const routes: Routes = [
    {
        path: 'grid',
        component: UserGridComponent
    },{
        path: 'learningMatTable1',
        component: MatTable1Component
    },
    {
        path: 'learningMatTable2',
        component: MatTableDynamicReadWriteComponent
    },
    
    


];

export const UserRoutingModule = RouterModule.forChild(routes);