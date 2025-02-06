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
		loadComponent: () => import('./add/add.component').then(m => m.NgRhombusAdminBlogPostAddComponent),
		data: {
			breadcrumb: 'Blog'
		}
	},
	{
		path: 'edit/:id',
		loadComponent: () => import('./edit/edit.component').then(m => m.NgRhombusAdminBlogPostEditComponent),
		data: {
			breadcrumb: 'Blog'
		}
	}
]