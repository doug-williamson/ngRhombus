<<<<<<< HEAD
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
=======
import { Component, input } from '@angular/core';
import { MatListModule, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
import { IBlog } from '../../models/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ng-rhombus-blog-list',
<<<<<<< HEAD
  imports: [DatePipe, MatListModule],
=======
  imports: [DatePipe, MatListModule, MatListItem, RouterLink],
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusBlogListComponent {
<<<<<<< HEAD
  	@Output() goToRoute = new EventEmitter<string>();
=======
  dataSource = input<IBlog[]>([]);
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90

	dataSource = input<IBlog[]>([]);
}
