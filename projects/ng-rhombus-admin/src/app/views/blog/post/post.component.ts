import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgRhombusBlogAddEditComponent } from '../../../../../../ng-rhombus/src/lib/blog/components/form/form.component';
import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';
import { NgRhombusBlogService } from '../../../../../../ng-rhombus/src/lib/blog/public-api';

@Component({
  selector: 'app-post',
  imports: [NgRhombusBlogAddEditComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusAdminBlogPostComponent implements OnInit {

  blogService = inject(NgRhombusBlogService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  posts = this.blogService.blogPosts;
  selectedBlogPost = signal<IBlog | undefined>(undefined);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const blogPostID = params['id'];

    });
  }

  goToBlogPosts() {
    this.router.navigateByUrl('/blog');
  }


}
