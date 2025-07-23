import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'ng-rhombus-blog-post',
  imports: [MarkdownComponent, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusBlogPostComponent {
  title = input<string>('title');
  description = input<string>('description');
  thumbnail = input<string>('thumbnail');
  content = input<string>('content');


}
