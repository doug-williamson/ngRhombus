import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Subject, filter, takeUntil } from 'rxjs';
import { NgRhombusHeaderComponent } from '../header/header.component';
import { NgRhombusNavListComponent } from '../nav-list/nav-list.component';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgRhombusNavItem } from '../nav-list/nav-list';
import { CommonModule } from '@angular/common';

export interface Breadcrumb{
  label: string;
    url: string;
}

@Component({
  selector: 'ng-rhombus-wrapper',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatListModule, MatToolbarModule, RouterModule, NgRhombusHeaderComponent, NgRhombusNavListComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class NgRhombusWrapperComponent implements OnInit, OnDestroy {

    destroyed = new Subject<void>();
    isMobile: boolean = false;
    currentScreenSize?: string;
    breadcrumbs: Breadcrumb[] = [];

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

    constructor(private breakpointObserver: BreakpointObserver, private activatedRoute: ActivatedRoute, private router: Router) {
      breakpointObserver
        .observe([ Breakpoints.XSmall ])
        .pipe(takeUntil(this.destroyed))
        .subscribe(result => {
          this.isMobile = result.matches;
        });
    }

    ngOnInit() {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
        //set breadcrumbs
        console.log('Event: ', event);
        let root: ActivatedRoute = this.activatedRoute.root;
         this.breadcrumbs = this.getBreadcrumbs(root);
      })
    }

    ngOnDestroy(): void {
      this.destroyed.next();
      this.destroyed.complete();
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
      const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

      //get the child routes
      console.log('the real route?: ', route)
      let children: ActivatedRoute[] = route.children;

      
  
      if (children.length === 0) {
        // return breadcrumbs;
      }
      console.log('children: ', children);
  
      //iterate over each children
      for (let child of children) {
        console.log('child1: ', child)
        //verify primary route
        // if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length==0) {
        //   continue;
        // }
  
        //verify the custom data property "breadcrumb" is specified on the route
        // if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        //   return this.getBreadcrumbs(child, url, breadcrumbs);
        // }
  
        //get the route's URL segment
        let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
    
        //append route URL to URL
        url += `/${routeURL}`;
  
        //add breadcrumb
        let breadcrumb: Breadcrumb = {
          label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
          url: url
        };
        breadcrumbs.push(breadcrumb);
  
        //recursive
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      console.log('breadcrumbs: ', breadcrumbs)
      return breadcrumbs;
    }
}
