import { Component, inject } from '@angular/core';
import { NgRhombusBlogPostComponent, NgRhombusBlogService, WrapperService } from '../../../../../../ng-rhombus/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRhombusAppBlogStore } from '../blog.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ng-rhombus-app-blog-post',
  imports: [MatProgressSpinnerModule, NgRhombusBlogPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusAppBlogPostComponent {
	router = inject(Router);
  wrapperService = inject(WrapperService);
  blogStore = inject(NgRhombusAppBlogStore);
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

  routeToBlogCollection() {
	this.router.navigateByUrl('/blog');
  }
}
