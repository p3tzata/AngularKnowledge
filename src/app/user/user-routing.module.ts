import { RouterModule, Routes } from "@angular/router";
import { MatTableDynamicReadWriteComponent } from "./zLearning/mat-table-dynamic-read-write/mat-table-dynamic-read-write.component";


const routes: Routes = [
    
    {
        path: 'grid',
        component: MatTableDynamicReadWriteComponent
    },
    
    


];

export const UserRoutingModule = RouterModule.forChild(routes);