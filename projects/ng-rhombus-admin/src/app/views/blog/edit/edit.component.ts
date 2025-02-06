import { Component, inject, OnInit } from '@angular/core';
import { NgRhombusBlogAddEditComponent } from '../../../../../../ng-rhombus/src/lib/blog/components/form/form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';
import { NgRhombusBlogService } from '../../../../../../ng-rhombus/src/lib/blog/public-api';
import { WrapperService } from '../../../../../../ng-rhombus/src/lib/shell/services/wrapper.service';
import { NgRhombusAdminBlogStore } from '../blog.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ng-rhombus-admin-edit',
  imports: [NgRhombusBlogAddEditComponent, MatProgressSpinnerModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class NgRhombusAdminBlogPostEditComponent implements OnInit {
  router = inject(Router);
  wrapperService = inject(WrapperService);
  blogStore = inject(NgRhombusAdminBlogStore);
  blogService = inject(NgRhombusBlogService);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const blogPostID = params['id'];
      this.blogStore.load(blogPostID);
    });
  }

  ngOnInit(): void {

  }

  onCancelEvent() {
    this.routeToBlogCollection();
  }

  onSubmitEvent(submittedBlogPost: IBlog) {
    this.blogService.updateBlogPost(submittedBlogPost).then(() => {
      // display 'New Blog Post Added' alert, redirect back to collection
      this.wrapperService.openSnackbar('');
      this.routeToBlogCollection();
    });
  }

  routeToBlogCollection() {
    this.router.navigateByUrl('/blog');
  }
}
