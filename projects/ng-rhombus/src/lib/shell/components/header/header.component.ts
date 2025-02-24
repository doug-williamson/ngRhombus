import { Component, EventEmitter, inject, input, Input, output, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { WrapperService } from '../../services/wrapper.service';
import { Router } from '@angular/router';
import { NgRhombusAuthenticationService } from '../../services/authentication.service';
import { ThemeService } from '../../services/theme.service';
import { TitleCasePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'ng-rhombus-header',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbar, TitleCasePipe, MatProgressBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class NgRhombusHeaderComponent {
  isLoading = input<boolean>(false);
  wrapperService = inject(WrapperService);
  authService = inject(NgRhombusAuthenticationService);
  protected themeService = inject(ThemeService);
  router = inject(Router);

  logOut = output<void>();

  darkMode = this.wrapperService.darkMode;
  user = this.authService.currentUserProfile;

  @Input()
  isMobile: boolean = false;

  @Input()
  title!: string;

  @Output() menuToggled = new EventEmitter;

  toggleSidebar() {
    this.menuToggled.emit();
  }

  logout() {
    this.logOut.emit();
  }
}
