import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'ng-rhombus-header',
  standalone: true,
  imports: [ButtonModule, ToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class NgRhombusHeaderComponent {

	@Output() sidebarToggled = new EventEmitter;

	toggleSidebar() {
		this.sidebarToggled.emit();
	}
}
