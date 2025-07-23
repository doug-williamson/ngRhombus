import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgRhombusBlogListComponent, NgRhombusBlogPostThumbnailService, NgRhombusBlogService, WrapperService } from '../../../../../../ng-rhombus/src/public-api';
import { NgRhombusAppBlogStore } from '../blog.store';


@Component({
  selector: 'ng-rhombus-app-blog-list',
  imports: [NgRhombusBlogListComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusAppBlogListComponent {
  wrapperService = inject(WrapperService);
  blogService = inject(NgRhombusBlogService);
  blogStore = inject(NgRhombusAppBlogStore);
  thumbnailService = inject(NgRhombusBlogPostThumbnailService)

  router = inject(Router);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    if (this.blogService.blogPosts.length === 0) {
      this.blogStore.loadAll();
    }
  }
}
