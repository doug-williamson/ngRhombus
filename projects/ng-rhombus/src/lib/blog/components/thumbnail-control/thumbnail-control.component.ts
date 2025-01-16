import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'ng-rhombus-thumbnail-control',
  imports: [],
  templateUrl: './thumbnail-control.component.html',
  styleUrl: './thumbnail-control.component.scss'
})
export class ThumbnailControlComponent {
  width = input<number>(0);
  height = input<number>(0);

  placeholder = computed(() => `https://placehold.co/${this.width()}x${this.height()}`);
}
