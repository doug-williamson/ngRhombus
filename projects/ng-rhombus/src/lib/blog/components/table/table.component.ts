import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IBlog } from '../../models/blog';

@Component({
  selector: 'ng-rhombus-blog-table',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class NgRhombusBlogTableComponent {
  @Output() clickEvent = new EventEmitter<string>();

  dataSource = input<IBlog[]>([]);
  displayedColumns: string[] = ['timestamp', 'title', 'description', 'star'];

  goToBlogPost(id: string) {
    console.log('ID: ', id);
    this.clickEvent.emit(id);
  }

}
