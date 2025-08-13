import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IBlog } from '../../models/blog';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'ng-rhombus-blog-post',
  imports: [MarkdownComponent, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusBlogPostComponent {
	dataSource = input<IBlog>();
}
