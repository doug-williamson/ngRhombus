import { Component, inject, signal } from '@angular/core';
import { ILoginCredentials, NgRhombusLoginComponent } from '../../../../../ng-rhombus';
import { NgRhombusAdminAppStore } from '../../app.store';

@Component({
  selector: 'app-login',
  imports: [NgRhombusLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'Rhombus Software'

  loading = signal<boolean>(false);
  appStore = inject(NgRhombusAdminAppStore);

  onFormSubmit(formData: ILoginCredentials) {
    this.appStore.login(formData.email, formData.password);
  }
}
