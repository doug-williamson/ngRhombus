import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgRhombusAdminBlogStore } from '../blog.store';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogTableComponent, WrapperService, NgRhombusBlogService, NgRhombusBlogPostThumbnailService, IBlog, NgRhombusBlogDeletePostComponent } from '../../../../../../ng-rhombus';

@Component({
	selector: 'ng-rhombus-admin-blog-collection',
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, NgRhombusBlogTableComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class NgRhombusAdminBlogCollectionComponent implements OnInit {
	wrapperService = inject(WrapperService);
	blogService = inject(NgRhombusBlogService);
	blogStore = inject(NgRhombusAdminBlogStore);
	thumbnailService = inject(NgRhombusBlogPostThumbnailService)

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
		this.router.navigateByUrl(`/blog/edit/${id}`);
	}

	onDeleteBlogPost(blogPost: IBlog) {
		const dialogRef = this.dialog.open(NgRhombusBlogDeletePostComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.thumbnailService.deleteImage(blogPost.thumbnail).then(() => {
					this.blogService.deleteBlogPost(blogPost.id).then(() => {
						this.blogStore.loadAll();
						this.wrapperService.openSnackbar('Deleted Blog Post');
					})
				})

			}
		});
	}
}
