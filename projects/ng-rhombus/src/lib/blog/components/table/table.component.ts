import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IBlog } from '../../models/blog';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogService } from '../../services/blog.service';
import { NgRhombusBlogPostThumbnailService } from '../../services/thumbnail.service';

@Component({
  selector: 'ng-rhombus-blog-table',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class NgRhombusBlogTableComponent {
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<IBlog>();

  readonly thumbnailService = inject(NgRhombusBlogPostThumbnailService);
  readonly blogService = inject(NgRhombusBlogService);
  readonly dialog = inject(MatDialog);

  dataSource = input<IBlog[]>([]);
  displayedColumns: string[] = ['timestamp', 'title', 'description', 'edit', 'delete'];

  goToBlogPost(id: string) {
    this.editEvent.emit(id);
  }

  onDeleteBlogPost(blogPost: IBlog) {
    this.deleteEvent.emit(blogPost);
  }

}
