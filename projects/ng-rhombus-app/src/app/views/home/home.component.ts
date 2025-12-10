import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgRhombusBlogPostLatestComponent, NgRhombusBlogService } from '../../../../../ng-rhombus/src/public-api';
import { NgRhombusAppBlogStore } from '../blog/blog.store';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, NgRhombusBlogPostLatestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class NgRhombusAppHomeComponent {
  blogStore = inject(NgRhombusAppBlogStore);
  blogService = inject(NgRhombusBlogService);

  dialog = inject(MatDialog);

  ngOnInit(): void {
    if (this.blogService.blogPosts.length === 0) {
      this.blogStore.loadLatest();
    }
  }
}
