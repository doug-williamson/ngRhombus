import { Component } from '@angular/core';
import { NgRhombusLoginComponent } from '../../../../../ng-rhombus/src/public-api';

@Component({
  selector: 'app-login',
  imports: [NgRhombusLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'Rhombus Software | Admin'
}
