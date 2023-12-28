import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { NgRhombusNavItem } from '../nav-list/nav-list';
import { NgRhombusHeaderComponent } from '../header/header.component';
import { NgRhombusNavListComponent } from '../nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarModule } from 'primeng/sidebar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ng-rhombus-wrapper',
  standalone: true,
  imports: [SidebarModule, ToolbarModule, RouterModule, NgRhombusHeaderComponent, NgRhombusNavListComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class NgRhombusWrapperComponent {

	sidebarVisible = true;
	private _sidenavToggle = signal<boolean>(false);

    destroyed = new Subject<void>();
    isMobile: boolean = false;
    currentScreenSize?: string;

    @Input()
    routeCollection!: MenuItem[] | undefined;

    constructor(breakpointObserver: BreakpointObserver) {
		breakpointObserver
			.observe([ Breakpoints.XSmall ])
			.pipe(takeUntil(this.destroyed))
			.subscribe(result => {
				this.isMobile = result.matches;
			});
    }

    toggleSidebar() {
		console.log('Doug')
		this.sidebarVisible = !this.sidebarVisible;
	}

    ngOnDestroy(): void {
		this.destroyed.next();
		this.destroyed.complete();
    }
}
