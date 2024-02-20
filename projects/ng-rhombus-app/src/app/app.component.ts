import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgRhombusNavItem, NgRhombusWrapperComponent } from '../../../ng-rhombus/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgRhombusWrapperComponent],
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
