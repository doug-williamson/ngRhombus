import { Component } from '@angular/core';
import { NgRhombusNavItem, NgRhombusWrapperComponent } from '../../../../../ng-rhombus/src/public-api';

@Component({
  selector: 'app-wrapper',
  imports: [NgRhombusWrapperComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {
  title = 'Rhombus Software | Admin';
	routeCollection: NgRhombusNavItem[] | undefined;

	ngOnInit() {
		this.routeCollection = [
			{
				label: 'Home',
				icon: 'home',
				route: 'home'
			},
			{
				label: 'Blog',
				icon: 'rss_feed',
				route: 'blog'
			},
			{
				label: 'About',
				icon: 'info',
				route: 'about'
			},
		];
	}
}
