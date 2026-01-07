import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ng-rhombus-blog-confirmation',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class NgRhombusBlogConfirmationComponent {

  data = inject(MAT_DIALOG_DATA);
}
