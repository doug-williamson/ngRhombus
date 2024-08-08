import { Component, effect, inject } from '@angular/core';
import { WrapperService } from '../../../../../ng-rhombus/src/lib/shell/wrapper/wrapper.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  wrapperService = inject(WrapperService);

  constructor() {
    effect(() => {
      const triggeredCreateNew = this.wrapperService.triggerCreateNew();
      if (triggeredCreateNew) {
        console.log('Doug!')
      }
    });
  }
}
