import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent),
        data: {
            breadcrumb: 'Home'
        },
    },
    {
        path: 'blog',
        loadChildren: () => import('./views/blog/blog.routes').then(routes => routes.BLOG_ROUTES),
    },
    {
        path: 'about',
        loadComponent: () => import('./views/about/about.component').then(m => m.AboutComponent),
        data: {
            breadcrumb: 'About'
        }
    }
];
