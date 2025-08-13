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
<<<<<<< HEAD
	{
		path: 'blog',
		loadChildren: () => import('./views/blog/blog.routes').then(routes => routes.BLOG_ROUTES),
	},
=======
    {
        path: 'blog',
        loadChildren: () => import('./views/blog/blog.routes').then(routes => routes.BLOG_ROUTES),
    },
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
    {
        path: 'about',
        loadComponent: () => import('./views/about/about.component').then(m => m.AboutComponent),
        data: {
            breadcrumb: 'About'
        }
    }
];
