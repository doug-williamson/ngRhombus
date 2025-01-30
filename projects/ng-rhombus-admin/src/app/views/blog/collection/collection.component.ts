import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgRhombusBlogPostThumbnailService, NgRhombusBlogService, NgRhombusBlogTableComponent } from '../../../../../../ng-rhombus/src/lib/blog/public-api';
import { Router } from '@angular/router';
import { NgRhombusBlogStore } from '../../../../../../ng-rhombus/src/lib/blog/services/blog.store';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WrapperService } from '../../../../../../ng-rhombus/src/lib/shell/services/wrapper.service';
import { Subject } from 'rxjs';
import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogDeletePostComponent } from '../../../../../../ng-rhombus/src/lib/blog/components/dialogs/delete-post/delete-post.component';

@Component({
	selector: 'ng-rhombus-admin-blog-collection',
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, NgRhombusBlogTableComponent],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss'
})
export class NgRhombusAdminBlogCollectionComponent implements OnInit {
	destroyed = new Subject<void>();

	wrapperService = inject(WrapperService);
	blogService = inject(NgRhombusBlogService);
	blogStore = inject(NgRhombusBlogStore);
	thumbnailService = inject(NgRhombusBlogPostThumbnailService)

	router = inject(Router);
	dialog = inject(MatDialog);

	ngOnInit(): void {
		this.blogStore.loadAll();
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
