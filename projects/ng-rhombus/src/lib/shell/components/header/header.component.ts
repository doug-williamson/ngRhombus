import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WrapperService } from '../../services/wrapper.service';
import { Router } from '@angular/router';
import { NgRhombusAuthenticationService } from '../../services/authentication.service';
import { ThemeService } from '../../services/theme.service';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'ng-rhombus-header',
    imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, TitleCasePipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class NgRhombusHeaderComponent {

  wrapperService = inject(WrapperService);
  authService  = inject(NgRhombusAuthenticationService);
  protected themeService = inject(ThemeService);
  router = inject(Router);
  
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

  toggleDarkMode() {
    this.wrapperService.toggleTheme();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
