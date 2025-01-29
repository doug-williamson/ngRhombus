
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {

  private _darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode = toSignal(this._darkModeSubject.asObservable(), { initialValue: false })

  private _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs = toSignal(this._breadcrumbs.asObservable(), { initialValue: undefined });

  private _triggerCreateNew = new BehaviorSubject<void>(undefined);
  triggerCreateNew = this._triggerCreateNew.asObservable();
  // triggerCreateNew = toSignal(this._triggerCreateNew.asObservable());

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      //set breadcrumbs
      this._breadcrumbs.next(this.getBreadcrumbs(this.activatedRoute.root));
    })
  }

  clickedCreateNew() {
    this._triggerCreateNew.next(undefined);
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      // return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
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
      url += `${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}