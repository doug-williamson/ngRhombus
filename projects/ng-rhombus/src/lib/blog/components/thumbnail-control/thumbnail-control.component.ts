import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ng-rhombus-thumbnail-control',
  imports: [CommonModule, MatButton],
  templateUrl: './thumbnail-control.component.html',
  styleUrl: './thumbnail-control.component.scss'
})
export class ThumbnailControlComponent {
  width = input<number>(0);
  height = input<number>(0);

  placeholder = computed(() => `https://placehold.co/${this.width()}x${this.height()}`);
}
