import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { WrapperComponent } from './wrapper.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const WRAPPER_ROUTES: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full',
            },
            {
                path: 'home',
                loadComponent: () => import('../home/home.component').then(m => m.HomeComponent),
            },
            {
                path: 'blog',
                loadChildren: () => import('../blog/blog.routes').then(routes => routes.BLOG_ROUTES),
            },
            {
                path: 'about',
                loadComponent: () => import('../about/about.component').then(m => m.AboutComponent),
            }
        ]
    }
];
