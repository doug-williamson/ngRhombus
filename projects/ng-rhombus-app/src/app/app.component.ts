import { Component, OnInit } from '@angular/core';
import { NgRhombusNavItem, NgRhombusWrapperComponent } from '../../../ng-rhombus/src/public-api';

@Component({
	selector: 'app-root',
	imports: [NgRhombusWrapperComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	animations: []
})
export class AppComponent implements OnInit {
	title = 'Rhombus Software';
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
