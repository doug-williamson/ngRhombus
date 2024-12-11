import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgRhombusNavItem } from './nav-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'ng-rhombus-nav-list',
    imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatTabsModule],
    templateUrl: './nav-list.component.html',
    styleUrl: './nav-list.component.css'
})
export class NgRhombusNavListComponent implements OnInit {
    activeLink?: string;

    @Input()
    routeCollection: NgRhombusNavItem[] | undefined;

    ngOnInit() {

    }
}
