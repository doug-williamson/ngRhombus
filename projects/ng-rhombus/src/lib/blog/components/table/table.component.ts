import { Component, ElementRef, EventEmitter, inject, input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IBlog } from '../../models/blog';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogDeletePostComponent } from '../dialogs/delete-post/delete-post.component';
import { NgRhombusBlogService } from '../../services/blog.service';
import { ThumbnailControlService } from '../thumbnail-control/thumbnail-control.service';

@Component({
  selector: 'ng-rhombus-blog-table',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class NgRhombusBlogTableComponent {
  @Output() clickEvent = new EventEmitter<string>();

  readonly thumbnailService = inject(ThumbnailControlService);
  readonly blogService = inject(NgRhombusBlogService);
  readonly dialog = inject(MatDialog);

  dataSource = input<IBlog[]>([]);
  displayedColumns: string[] = ['timestamp', 'title', 'description', 'edit', 'delete'];

  goToBlogPost(id: string) {
    this.clickEvent.emit(id);
  }

  onDeleteBlogPost(id: string, thumbnail: string) {
    const dialogRef = this.dialog.open(NgRhombusBlogDeletePostComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.thumbnailService.deleteImage(thumbnail).then(() => {
          this.blogService.deleteBlogPost(id).then(() => {

          })
        })
      }
    })
  }

}
