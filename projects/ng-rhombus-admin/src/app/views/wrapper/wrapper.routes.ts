import { Routes } from '@angular/router';
import { WrapperComponent } from './wrapper.component';


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
                loadComponent: () => import('../home/home.component').then(m => m.NgRhombusAdminHomeComponent),
                data: {
                    breadcrumb: 'Home'
                }
            },
            {
                path: 'blog',
                loadChildren: () => import('../blog/blog.routes').then(routes => routes.BLOG_ROUTES),
            },
            {
                path: 'about',
                loadComponent: () => import('../about/about.component').then(m => m.AboutComponent),
                data: {
                    breadcrumb: 'About'
                }
            }
        ]
    }
];
