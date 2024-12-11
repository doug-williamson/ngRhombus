import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'ng-rhombus-header',
    imports: [NgIf, MatButtonModule, MatIconModule, MatToolbarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class NgRhombusHeaderComponent {

  @Input()
  isMobile: boolean = false;

  @Input()
  title!: string;
  
	@Output() menuToggled = new EventEmitter;

	toggleSidebar() {
		this.menuToggled.emit();
	}
}
