import { RouterModule, Routes } from "@angular/router";
import { UserGridComponent } from "./user-grid/user-grid.component";

const routes: Routes = [
    {
        path: 'grid',
        component: UserGridComponent
    }
];

export const UserRoutingModule = RouterModule.forChild(routes)