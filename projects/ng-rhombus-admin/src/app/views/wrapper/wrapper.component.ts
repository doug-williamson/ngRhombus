import { Component, effect, inject } from '@angular/core';
import { NgRhombusNavItem, NgRhombusWrapperComponent, WrapperService } from '../../../../../ng-rhombus';
import { NgRhombusAdminAppStore } from '../../app.store';

@Component({
	selector: 'app-wrapper',
	imports: [NgRhombusWrapperComponent],
	templateUrl: './wrapper.component.html',
	styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {
	title = 'Rhombus Software | Admin';
	routeCollection: NgRhombusNavItem[] | undefined;

	appStore = inject(NgRhombusAdminAppStore);
	wrapperService = inject(WrapperService);

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

	clickedAddNewEvent() {
		console.log('Clicked Add New button')
		this.wrapperService.clickedCreateNew();
	}
}
