import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgRhombusBlogService, NgRhombusBlogTableComponent } from '../../../../../../ng-rhombus/src/lib/blog/public-api';

import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';
import { Event, Router } from '@angular/router';

@Component({
	selector: 'ng-rhombus-admin-blog-collection',
	imports: [MatButtonModule, NgRhombusBlogTableComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class NgRhombusAdminBlogCollectionComponent implements OnInit {

	blogService = inject(NgRhombusBlogService);
	dataSource = this.blogService.blogPosts;

	router = inject(Router);

	ngOnInit(): void {
		console.log('Collection ngOnInit')
		// this.blogService.fetchBlogPosts().then((blogPosts: IBlog[]) => {
		// 	console.log('Douglas')
		// 	this.posts = blogPosts;
		// })
	}

	routeToBlogPost(id: string) {
		this.router.navigateByUrl(`/blog/${id}`);
	}
}
