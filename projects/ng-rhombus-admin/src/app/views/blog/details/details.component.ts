import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgRhombusBlogAddEditComponent, WrapperService, NgRhombusBlogService, IBlog } from '../../../../../../ng-rhombus';
import { NgRhombusAdminBlogStore } from '../blog.store';

@Component({
  selector: 'ng-rhombus-admin-blog-details',
  imports: [NgRhombusBlogAddEditComponent, MatProgressSpinnerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class NgRhombusAdminBlogPostDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private wrapperService = inject(WrapperService);
  blogStore = inject(NgRhombusAdminBlogStore);
  blogService = inject(NgRhombusBlogService);

  id: string | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? null;
      if (this.id) {
        this.blogStore.load(this.id);
      }
    });
  }

  ngOnInit(): void {}

  onCancelEvent() {
    this.router.navigateByUrl('/blog');
  }

  onSubmitEvent(submittedBlogPost: IBlog) {
    const op = this.id ? this.blogService.updateBlogPost(submittedBlogPost)
                       : this.blogService.createBlogPost(submittedBlogPost);

    op.then(() => {
      this.wrapperService.openSnackbar(this.id ? 'Blog Post updated!' : 'Blog Post added!');
      this.router.navigateByUrl('/blog');
    });
  }
}