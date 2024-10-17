import { Component, effect, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { WrapperService } from '../../../../../ng-rhombus/src/lib/shell/wrapper/wrapper.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {

  readonly dialog = inject(MatDialog);
  wrapperService = inject(WrapperService);

  constructor() {
    effect(() => {
      let triggeredCreateNew = this.wrapperService.triggerCreateNew();
      if (triggeredCreateNew) {
        this.openDialog();        
      }
    });
  }

  openDialog() {
    // const dialogRef = this.dialog.open()
    console.log('Doug')
  }
}
