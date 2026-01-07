import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRhombusBlogAddEditComponent, WrapperService, NgRhombusBlogService, IBlog } from '../../../../../../ng-rhombus';

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
