import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";

export const BLOG_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () => import('./collection/collection.component').then(m => m.NgRhombusAdminBlogCollectionComponent),
		data: {
			breadcrumb: 'Blog'
		}
	},
	{
		path: 'create',
		loadComponent: () => import('./post/post.component').then(m => m.NgRhombusAdminBlogPostComponent),
		data: {
			breadcrumb: 'Blog'
		}
	}
]