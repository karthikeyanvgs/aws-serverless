import { Routes, RouterModule } from '@angular/router';
import { MoniterListComponent } from './pages/moniter-list/moniter-list.component';
import { MoniterDetailComponent } from './pages/moniter-detail/moniter-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'moniter-list',
        component: MoniterListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'moniter-detail',
        component: MoniterDetailComponent,
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forRoot(routes);