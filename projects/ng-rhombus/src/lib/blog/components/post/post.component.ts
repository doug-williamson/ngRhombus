import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IBlog } from '../../models/blog';
import { MarkdownComponent } from 'ngx-markdown';
import { DatePipe, NgClass } from '@angular/common';
import { ThemeService } from '../../../shell/services/theme.service';
import { NgRhombusSpinnerComponent } from '../../../shell/public-api';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'ng-rhombus-blog-post',
  imports: [DatePipe, NgClass, MarkdownComponent, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusBlogPostComponent implements OnInit {
  dataSource = input<IBlog>();
  themeService = inject(ThemeService);
  #title = inject(Title);
  #meta = inject(Meta);

  ngOnInit() {
    // React to dataSource changes and keep SEO meta up to date
    effect(() => {
      const post = this.dataSource();
      if (!post) {
        return;
      }

      const published = new Date(post.timestamp?.toMillis?.() ?? Date.now()).toISOString();

      // Document title
      this.#title.setTitle(post.title);

      // Basic meta
      this.#meta.updateTag({ name: 'description', content: post.description });

      // Open Graph
      this.#meta.updateTag({ property: 'og:type', content: 'article' });
      this.#meta.updateTag({ property: 'og:title', content: post.title });
      this.#meta.updateTag({ property: 'og:description', content: post.description });
      if (post.thumbnail) {
        this.#meta.updateTag({ property: 'og:image', content: post.thumbnail });
      }
      this.#meta.updateTag({ property: 'article:published_time', content: published });

      // Twitter Card
      this.#meta.updateTag({ name: 'twitter:card', content: post.thumbnail ? 'summary_large_image' : 'summary' });
      this.#meta.updateTag({ name: 'twitter:title', content: post.title });
      this.#meta.updateTag({ name: 'twitter:description', content: post.description });
      if (post.thumbnail) {
        this.#meta.updateTag({ name: 'twitter:image', content: post.thumbnail });
      }
    });
  }
}
