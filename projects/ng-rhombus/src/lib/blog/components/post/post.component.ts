import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
<<<<<<< HEAD
import { IBlog } from '../../models/blog';
=======
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'ng-rhombus-blog-post',
  imports: [MarkdownComponent, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusBlogPostComponent {
<<<<<<< HEAD
	dataSource = input<IBlog>();
=======
  title = input<string>('title');
  description = input<string>('description');
  thumbnail = input<string>('thumbnail');
  content = input<string>('content');


>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
}
