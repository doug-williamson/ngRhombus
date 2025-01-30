import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgRhombusBlogTableComponent } from '../../../../../../ng-rhombus/src/lib/blog/public-api';
import { Router } from '@angular/router';
import { NgRhombusBlogStore } from '../../../../../../ng-rhombus/src/lib/blog/services/blog.store';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WrapperService } from '../../../../../../ng-rhombus/src/lib/shell/services/wrapper.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'ng-rhombus-admin-blog-collection',
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, NgRhombusBlogTableComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class NgRhombusAdminBlogCollectionComponent implements OnInit {
	destroyed = new Subject<void>();

	wrapperService = inject(WrapperService);
	blogStore = inject(NgRhombusBlogStore);

	router = inject(Router);

	ngOnInit(): void {
		console.log('Collection ngOnInit')
		if (this.blogStore.blogPosts().length === 0) {
			this.blogStore.loadAll();
		}
	}

	createNewBlogPost() {
		this.router.navigateByUrl('/blog/create');
	}

	routeToBlogPost(id: string) {
		this.router.navigateByUrl(`/blog/${id}`);
	}
}
