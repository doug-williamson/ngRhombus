import { Component, inject } from '@angular/core';
<<<<<<< HEAD
import { NgRhombusBlogPostComponent, NgRhombusBlogService, WrapperService } from '../../../../../../ng-rhombus';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRhombusAppBlogStore } from '../blog.store';

@Component({
  selector: 'ng-rhombus-app-post',
  imports: [NgRhombusBlogPostComponent],
=======
import { NgRhombusBlogPostComponent, NgRhombusBlogService, WrapperService } from '../../../../../../ng-rhombus/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRhombusAppBlogStore } from '../blog.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ng-rhombus-app-blog-post',
  imports: [MatProgressSpinnerModule, NgRhombusBlogPostComponent],
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusAppBlogPostComponent {
<<<<<<< HEAD
	router = inject(Router);
=======
  router = inject(Router);
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
  wrapperService = inject(WrapperService);
  blogStore = inject(NgRhombusAppBlogStore);
  blogService = inject(NgRhombusBlogService);

  constructor(private route: ActivatedRoute) {
<<<<<<< HEAD
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

  routeToBlogCollection() {
	this.router.navigateByUrl('/blog');
=======
    this.route.params.subscribe(params => {
      const blogPostID = params['id'];
      this.blogStore.load(blogPostID);
    });
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
  }
}
