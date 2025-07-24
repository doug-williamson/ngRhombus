import { Component, input } from '@angular/core';
import { MatListModule, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { IBlog } from '../../models/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ng-rhombus-blog-list',
  imports: [DatePipe, MatListModule, MatListItem, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusBlogListComponent {
  dataSource = input<IBlog[]>([]);

}
