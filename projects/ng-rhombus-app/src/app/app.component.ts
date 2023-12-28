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
	routeCollection: MenuItem[] | undefined;

	ngOnInit() {
		this.routeCollection = [
			{
				label: 'Home',
				icon: 'pi pi-home',
				route: ''
			},
			{
				label: 'Home',
				icon: 'pi pi-home',
				route: ''
			},
			{
				label: 'Home',
				icon: 'pi pi-home',
				route: ''
			},
		];

		console.log(this.routeCollection)
	}
}
