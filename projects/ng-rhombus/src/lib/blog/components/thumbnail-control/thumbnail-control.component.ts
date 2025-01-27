import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ng-rhombus-thumbnail-control',
  imports: [CommonModule, MatButton],
  templateUrl: './thumbnail-control.component.html',
  styleUrl: './thumbnail-control.component.scss'
})
export class ThumbnailControlComponent {
  width = input<number>(0);
  height = input<number>(0);

  dialog = inject(MatDialog);

  placeholder = computed(() => `https://placehold.co/${this.width()}x${this.height()}`);

  onThumbnailSelected() {
    // if (!input.files || input.files.length <= 0) {
    // 	return;
    // }
    // const file: File = input.files[0];
  }
}
