import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgRhombusWrapperComponent } from '../../../ng-rhombus/src/public-api';
import { NgRhombusNavItem } from '../../../ng-rhombus/src/lib/shell/nav-list/nav-list';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgRhombusWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: []
})
export class AppComponent implements OnInit {
	title = 'ngRhombusApp';
	routeCollection: NgRhombusNavItem[] | undefined;

	ngOnInit() {
		this.routeCollection = [
			{
				label: 'Home',
				icon: 'home',
				route: ''
			},
			{
				label: 'Blog',
				icon: 'rss_feed',
				route: ''
			},
			{
				label: 'About',
				icon: 'info',
				route: ''
			},
		];
	}
}
