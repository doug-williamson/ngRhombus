import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgRhombusBlogStore } from '../../../../../ng-rhombus/src/lib/blog/blog.store';

@Component({
	selector: 'app-blog',
	imports: [RouterOutlet],
	templateUrl: './blog.component.html',
	styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
	router = inject(Router);

	blogStore = inject(NgRhombusBlogStore);

	ngOnInit() {
		console.log('Parent Blog ngOnInit')
		if (this.blogStore.blogPosts().length === 0) {
			this.blogStore.loadAll();
		}

	}

	goToBlogPost(id: string) {
		this.router.navigateByUrl(`/blog/${id}`);
	}
}
