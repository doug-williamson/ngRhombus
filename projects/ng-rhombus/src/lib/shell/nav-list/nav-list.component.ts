import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { NgRhombusNavItem } from './nav-list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-rhombus-nav-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule, MatTabsModule],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css'
})
export class NgRhombusNavListComponent implements OnInit {
    activeLink?: string;

    @Input()
    routeCollection!: NgRhombusNavItem[];

    ngOnInit() {

    }
}
