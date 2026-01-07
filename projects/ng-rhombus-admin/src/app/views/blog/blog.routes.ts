import { Routes } from "@angular/router";

export const BLOG_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./collection/collection.component').then(m => m.NgRhombusAdminBlogCollectionComponent),
		data: {
			breadcrumb: 'Blog'
		}
	},
	{
		path: 'add',
		loadComponent: () => import('./details/details.component').then(m => m.NgRhombusAdminBlogPostDetailsComponent),
		data: {
			breadcrumb: 'Blog'
		}
	},
	{
		path: 'edit/:id',
		loadComponent: () => import('./details/details.component').then(m => m.NgRhombusAdminBlogPostDetailsComponent),
		data: {
			breadcrumb: 'Blog'
		}
	}
]