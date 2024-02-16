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
        loadComponent: () => import('./views/blog/blog.component').then(m => m.BlogComponent),
        data: {
            breadcrumb: 'Blog'
        }
    },
    {
        path: 'about',
        loadComponent: () => import('./views/about/about.component').then(m => m.AboutComponent),
        data: {
            breadcrumb: 'About'
        }
    }
];
