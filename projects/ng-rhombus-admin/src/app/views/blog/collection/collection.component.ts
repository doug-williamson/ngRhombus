import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgRhombusBlogService, NgRhombusBlogStore, NgRhombusBlogTableComponent } from '../../../../../../ng-rhombus/src/lib/blog/public-api';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';

@Component({
	selector: 'ng-rhombus-admin-blog-collection',
	imports: [MatButtonModule, NgRhombusBlogTableComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class NgRhombusAdminBlogCollectionComponent implements OnInit {

	blogService = inject(NgRhombusBlogService);
	// dataSource = toSignal(this.blogService.getBlogPosts(), { initialValue: undefined }); // this.blogService.blogPosts;
	dataSource: IBlog[] = [];
	router = inject(Router);

	ngOnInit(): void {
		console.log('Collection ngOnInit')
		this.blogService.getBlogPosts().subscribe((blogPosts: IBlog[]) => {
			console.log('Blog Posts: ', blogPosts);
			this.dataSource = blogPosts;
		})
	}

	createNewBlogPost() {
		this.router.navigateByUrl('/blog/create');
	}

	routeToBlogPost(id: string) {
		this.router.navigateByUrl(`/blog/${id}`);
	}
}
