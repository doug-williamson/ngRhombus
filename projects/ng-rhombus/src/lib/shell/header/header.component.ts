import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Theme, WrapperService } from '../wrapper/wrapper.service';

@Component({
    selector: 'ng-rhombus-header',
    imports: [MatButtonModule, MatIconModule, MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class NgRhombusHeaderComponent {

  wrapperService = inject(WrapperService);

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
}
