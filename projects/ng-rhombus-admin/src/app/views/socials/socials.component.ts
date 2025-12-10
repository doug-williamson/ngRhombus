// ...existing code...
import { Component, inject, OnInit } from '@angular/core';
import { NgRhombusSocialsTableComponent, NgRhombusSocialsService } from '../../../../../ng-rhombus/src/lib/socials/public-api';

@Component({
  selector: 'app-socials-admin',
  standalone: true,
  imports: [NgRhombusSocialsTableComponent],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class NgRhombusAdminSocialsComponent implements OnInit {
  socialsService = inject(NgRhombusSocialsService);

  ngOnInit() {
    this.socialsService.fetchAll();
  }
}
