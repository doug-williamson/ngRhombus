import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit, computed } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { NgRhombusHeaderComponent } from '../header/header.component';
import { NgRhombusNavListComponent } from '../nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgRhombusNavItem } from '../nav-list/nav-list';
import { CommonModule } from '@angular/common';
import { WrapperService } from './wrapper.service';
import { MatButtonModule } from '@angular/material/button';

export interface Breadcrumb{
  label: string;
    url: string;
}

@Component({
  selector: 'ng-rhombus-wrapper',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatToolbarModule, RouterModule, NgRhombusHeaderComponent, NgRhombusNavListComponent],
  providers: [WrapperService],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class NgRhombusWrapperComponent implements OnInit, OnDestroy {

    destroyed = new Subject<void>();
    isMobile: boolean = false;
    currentScreenSize?: string;

    breadcrumbs = computed(() => { return this.wrapperService.breadcrumbs() });

    fillerContent = Array.from(
      {length: 50},
      () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    );

    @Input()
    title!: string;

    @Input()
    routeCollection!: NgRhombusNavItem[] | undefined;

    constructor(private breakpointObserver: BreakpointObserver, private wrapperService: WrapperService) {
      this.breakpointObserver
        .observe([ Breakpoints.XSmall ])
        .pipe(takeUntil(this.destroyed))
        .subscribe(result => {
          this.isMobile = result.matches;
        });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete();
    }

    clickedCreateNew() {
      this.wrapperService.clickedCreateNew();
    }
}
