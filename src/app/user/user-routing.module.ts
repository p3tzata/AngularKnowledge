import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";


const routes: Routes = [
    
    {
        path: 'grid',
        component: IndexComponent
    }
    


];

export const UserRoutingModule = RouterModule.forChild(routes);