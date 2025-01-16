import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";

export const BLOG_ROUTES: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./collection/collection.component').then(m => m.NgRhombusAdminBlogCollectionComponent),
                data: {
                    breadcrumb: 'Blog'
                }
            },
            {
                path: ':id',
                loadComponent: () => import('./post/post.component').then(m => m.NgRhombusAdminBlogPostComponent),
                data: {
                    breadcrumb: 'Blog'
                }
            }
        ]
    }
]