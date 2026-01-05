import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IBlog } from '../../models/blog';
import { MarkdownComponent } from 'ngx-markdown';
import { DatePipe, NgClass } from '@angular/common';
import { ThemeService } from '../../../shell/services/theme.service';

@Component({
  selector: 'ng-rhombus-blog-post',
  imports: [DatePipe, NgClass, MarkdownComponent, MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class NgRhombusBlogPostComponent implements OnInit {
  dataSource = input<IBlog>();
  themeService = inject(ThemeService);

  ngOnInit() {

  }
}
