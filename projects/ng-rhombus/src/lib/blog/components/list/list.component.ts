import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { IBlog } from '../../models/blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ng-rhombus-blog-list',
  imports: [DatePipe, MatListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class NgRhombusBlogListComponent {
  @Output() goToRoute = new EventEmitter<string>();

  dataSource = input<IBlog[]>([]);

  goToBlogPost(id: string) {
    this.goToRoute.emit(id);
  }
}
