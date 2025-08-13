import { Routes } from "@angular/router";

export const BLOG_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./list/list.component').then(m => m.NgRhombusAppBlogListComponent),
        data: {
            breadcrumb: 'Blog'
        }
    },
    {
        path: ':id',
        loadComponent: () => import('./post/post.component').then(m => m.NgRhombusAppBlogPostComponent),
        data: {
            breadcrumb: 'Blog'
        }
    }
]