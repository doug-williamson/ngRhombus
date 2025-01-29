import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'ng-rhombus-blog-thumbnail',
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss'
})
export class NgRhombusBlogThumbnailComponent {
  width = input<number>(0);
  height = input<number>(0);
  imageSource = input<string>();

  placeholder = computed(() => `https://placehold.co/${this.width()}x${this.height()}`);
  contentSource = computed(() => { return this.imageSource() !== '' ? this.imageSource() : this.placeholder(); })
}
