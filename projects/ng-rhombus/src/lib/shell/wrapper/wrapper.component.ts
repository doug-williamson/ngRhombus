import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgRhombusNavItem } from '../nav-list/nav-list';
import { NgRhombusHeaderComponent } from '../header/header.component';
import { NgRhombusNavListComponent } from '../nav-list/nav-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-rhombus-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, NgRhombusHeaderComponent, NgRhombusNavListComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class NgRhombusWrapperComponent {
    destroyed = new Subject<void>();
    isMobile: boolean = false;
    currentScreenSize?: string;

    @Input()
    routeCollection!: NgRhombusNavItem[];

    constructor(breakpointObserver: BreakpointObserver) {
      breakpointObserver
        .observe([ Breakpoints.XSmall ])
        .pipe(takeUntil(this.destroyed))
        .subscribe(result => {
          this.isMobile = result.matches;
        });
    }

    ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete();
    }
}
