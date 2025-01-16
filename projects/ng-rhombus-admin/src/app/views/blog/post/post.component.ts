import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgRhombusBlogAddEditComponent } from '../../../../../../ng-rhombus/src/lib/blog/components/form/form.component';
import { NgRhombusBlogService } from '../../../../../../ng-rhombus/src/lib/blog/blog.service';
import { IBlog } from '../../../../../../ng-rhombus/src/lib/blog/models/blog';
import { NgRhombusBlogStore } from '../../../../../../ng-rhombus/src/lib/blog/blog.store';

@Component({
  selector: 'app-post',
  imports: [NgRhombusBlogAddEditComponent, MatButtonModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusAdminBlogPostComponent implements OnInit {

  blogService = inject(NgRhombusBlogService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  posts = this.blogService.blogPosts;
  selectedBlogPost = signal<IBlog | undefined>(undefined);
  blogStore = inject(NgRhombusBlogStore);

  ngOnInit(): void {
    console.log('DOUG')
    this.route.params.subscribe(params => {
      const blogPostID = params['id'];
      this.loadBlogPosts().then(() => {
        const selectedPost = this.blogStore.blogPosts().find(x => x.id === blogPostID);
        this.selectedBlogPost.set(selectedPost);
      });
    });
  }

  goToBlogPosts() {
    this.router.navigateByUrl('/blog');
  }

  async loadBlogPosts() {
    if (this.blogStore.blogPosts().length === 0) {
      await this.blogStore.loadAll();
    }
  }

}
