import { Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { IBlog } from '../../models/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ng-rhombus-blog-post-latest',
  imports: [DatePipe, MatListModule, RouterLink],
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class NgRhombusBlogPostLatestComponent {
  blogPost = input<IBlog>();
}
