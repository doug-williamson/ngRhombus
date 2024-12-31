import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { WrapperComponent } from './wrapper.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const wrapperRoutes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full',
            },
            {
                path: 'home',
                loadComponent: () => import('../../views/home/home.component').then(m => m.HomeComponent),
                canActivate: [AuthGuard],
                data: {
                    breadcrumb: 'Home',
                    authGuardPipe: redirectUnauthorizedToLogin
                },
            },
            {
                path: 'blog',
                loadComponent: () => import('../../views/blog/blog.component').then(m => m.BlogComponent),
                canActivate: [AuthGuard],
                data: {
                    breadcrumb: 'Blog',
                    authGuardPipe: redirectUnauthorizedToLogin
                }
            },
            {
                path: 'about',
                loadComponent: () => import('../../views/about/about.component').then(m => m.AboutComponent),
                canActivate: [AuthGuard],
                data: {
                    breadcrumb: 'About',
                    authGuardPipe: redirectUnauthorizedToLogin
                }
            }
        ]
    }
    
];
