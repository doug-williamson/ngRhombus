import { Component, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { IBlog } from '../../models/blog';
import { DatePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'ng-rhombus-blog-list',
  imports: [DatePipe, MatListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusBlogListComponent implements OnInit {
  @Output() goToRoute = new EventEmitter<string>();
  #title = inject(Title);
  #meta = inject(Meta);
  dataSource = input<IBlog[]>([]);

  ngOnInit() {
    const imageUrl = new URL('/fav.ico', window.location.origin).toString();

    // Document title
    this.#title.setTitle('Blog - Doug Williamson');

    // Basic meta
    this.#meta.updateTag({ name: 'description', content: 'This is my personal collection of blog posts.' });

    // Open Graph
    this.#meta.updateTag({ property: 'og:type', content: 'article' });
    this.#meta.updateTag({ property: 'og:title', content: 'Blog - Doug Williamson' });
    this.#meta.updateTag({ property: 'og:description', content: 'This is my personal collection of blog posts.' });
    this.#meta.updateTag({ property: 'og:image', content: imageUrl });
    // Twitter Card
    this.#meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.#meta.updateTag({ name: 'twitter:title', content: 'Blog - Doug Williamson' });
    this.#meta.updateTag({ name: 'twitter:description', content: 'This is my personal collection of blog posts.' });
    this.#meta.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  goToBlogPost(id: string) {
    this.goToRoute.emit(id);
  }
}
