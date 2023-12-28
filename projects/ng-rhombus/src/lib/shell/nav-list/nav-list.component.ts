import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { NgRhombusNavItem } from './nav-list';

@Component({
  selector: 'ng-rhombus-nav-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css'
})
export class NgRhombusNavListComponent implements OnInit {
    activeLink?: string;

    @Input()
    routeCollection!: MenuItem[] | undefined;

    ngOnInit() {
      console.log(this.routeCollection)
    }
}
