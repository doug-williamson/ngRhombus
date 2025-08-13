import { Routes } from "@angular/router";

export const BLOG_ROUTES: Routes = [
<<<<<<< HEAD
	{
		path: '',
		loadComponent: () => import('./collection/collection.component').then(m => m.NgRhombusBlogCollectionComponent),
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
=======
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
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
]