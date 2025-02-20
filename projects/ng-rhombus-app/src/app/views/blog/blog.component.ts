import { Component, effect, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { WrapperService } from '../../../../../ng-rhombus';

@Component({
  selector: 'app-blog',
  imports: [MatDialogModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  readonly dialog = inject(MatDialog);
  wrapperService = inject(WrapperService);

  constructor() {
    // effect(() => {
    //   let triggeredCreateNew = this.wrapperService.triggerCreateNew();
    //   if (triggeredCreateNew) {
    //     this.openDialog();        
    //   }
    // });
  }

  openDialog() {
    // const dialogRef = this.dialog.open()
  }
}
