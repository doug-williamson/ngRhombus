import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogListComponent, NgRhombusBlogService, NgRhombusPageComponent, NgRhombusSpinnerComponent } from '../../../../../../ng-rhombus/src/public-api';
import { NgRhombusAppBlogStore } from '../blog.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ng-rhombus-app-blog-list',
  imports: [NgRhombusPageComponent, MatToolbarModule, MatProgressSpinnerModule, NgRhombusBlogListComponent, NgRhombusSpinnerComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusAppBlogListComponent {

  blogService = inject(NgRhombusBlogService);
  blogStore = inject(NgRhombusAppBlogStore);

  router = inject(Router);

  ngOnInit(): void {
    if (this.blogService.blogPosts.length === 0) {
      this.blogStore.loadAll();
    }
  }

  routeToBlogPost(id: string) {
    this.router.navigateByUrl(`/blog/${id}`);
  }
}
