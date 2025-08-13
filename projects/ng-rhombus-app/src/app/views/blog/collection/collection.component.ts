import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgRhombusBlogListComponent, NgRhombusBlogService, WrapperService } from '../../../../../../ng-rhombus';
import { NgRhombusAppBlogStore } from '../blog.store';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ng-rhombus-app-collection',
  imports: [MatListModule, MatToolbarModule, NgRhombusBlogListComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class NgRhombusBlogCollectionComponent {
	destroyed = new Subject<void>();

	wrapperService = inject(WrapperService);
	blogService = inject(NgRhombusBlogService);
	blogStore = inject(NgRhombusAppBlogStore);

	router = inject(Router);
	dialog = inject(MatDialog);

	ngOnInit(): void {
		if (this.blogService.blogPosts.length === 0) {
			this.blogStore.loadAll();
		}
	}

	createNewBlogPost() {
		this.router.navigateByUrl('/blog/add');
	}

	routeToBlogPost(id: string) {
		this.router.navigateByUrl(`/blog/${id}`);
	}
}
