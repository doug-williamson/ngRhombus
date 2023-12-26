import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgRhombusWrapperComponent } from '../../../ng-rhombus/src/public-api';
import { NgRhombusNavItem } from '../../../ng-rhombus/src/lib/shell/nav-list/nav-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgRhombusWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngRhombusApp';

  routeCollection: NgRhombusNavItem[] = [
		{
			name: 'Home',
			route: 'home',
      icon: 'home',
		},
		{
			name: 'Route1',
			route: 'route1',
      icon: 'rss_feed',
		},
    {
			name: 'Route2',
			route: 'route2',
      icon: 'settings',
		},
	];
}
