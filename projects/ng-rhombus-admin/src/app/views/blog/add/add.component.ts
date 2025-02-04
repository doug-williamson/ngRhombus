import { Component, inject, OnInit } from '@angular/core';
import { NgRhombusBlogAddEditComponent } from '../../../../../../ng-rhombus/src/lib/blog/components/form/form.component';
import { Router } from '@angular/router';
import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';
import { NgRhombusBlogService } from '../../../../../../ng-rhombus/src/lib/blog/public-api';
import { WrapperService } from '../../../../../../ng-rhombus/src/lib/shell/services/wrapper.service';

@Component({
  selector: 'ng-rhombus-admin-add',
  imports: [NgRhombusBlogAddEditComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class NgRhombusAdminBlogPostAddComponent implements OnInit {
  router = inject(Router);
  wrapperService = inject(WrapperService);
  blogService = inject(NgRhombusBlogService);

  ngOnInit(): void {

  }

  onCancelEvent() {
    this.routeToBlogCollection();
  }

  onSubmitEvent(submittedBlogPost: IBlog) {
    this.blogService.createBlogPost(submittedBlogPost).then(() => {
      // display 'New Blog Post Added' alert, redirect back to collection
      this.wrapperService.openSnackbar('Blog Post added!');
      this.routeToBlogCollection();
    });
  }

  routeToBlogCollection() {
    this.router.navigateByUrl('/blog');
  }
}
