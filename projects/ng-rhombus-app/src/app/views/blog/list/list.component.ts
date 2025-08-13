import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogListComponent, NgRhombusBlogService } from '../../../../../../ng-rhombus/src/public-api';
import { NgRhombusAppBlogStore } from '../blog.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'ng-rhombus-app-blog-list',
  imports: [MatProgressSpinnerModule, NgRhombusBlogListComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusAppBlogListComponent {
  blogService = inject(NgRhombusBlogService);
  blogStore = inject(NgRhombusAppBlogStore);

  dialog = inject(MatDialog);

  ngOnInit(): void {
    if (this.blogService.blogPosts.length === 0) {
      this.blogStore.loadAll();
    }
  }
}
