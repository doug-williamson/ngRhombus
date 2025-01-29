import { Component, effect, inject } from '@angular/core';
import { NgRhombusNavItem, NgRhombusWrapperComponent } from '../../../../../ng-rhombus/src/public-api';
import { WrapperService } from '../../../../../ng-rhombus/src/lib/shell/services/wrapper.service';

@Component({
	selector: 'app-wrapper',
	imports: [NgRhombusWrapperComponent],
	templateUrl: './wrapper.component.html',
	styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {
	title = 'Rhombus Software | Admin';
	routeCollection: NgRhombusNavItem[] | undefined;

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
