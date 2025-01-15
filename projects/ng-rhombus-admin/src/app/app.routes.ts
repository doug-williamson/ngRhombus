import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./views/wrapper/wrapper.routes').then(routes => routes.WRAPPER_ROUTES),
        canActivate: [AuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin
        }
    },
    {
        path: 'login',
        loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent),
    }
];
