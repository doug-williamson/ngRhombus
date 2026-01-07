import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ng-rhombus-page',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class NgRhombusPageComponent {
  title = input<string>('');           // toolbar title
  backLink = input<string | null>(null); // optional back link (shows arrow_back when set)
}
