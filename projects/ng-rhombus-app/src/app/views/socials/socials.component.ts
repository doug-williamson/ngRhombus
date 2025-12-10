import { Component, inject, OnInit } from '@angular/core';
import { NgRhombusSocialsListComponent, NgRhombusSocialsService } from '../../../../../ng-rhombus/src/lib/socials/public-api';

@Component({
  selector: 'ng-rhombus-app-socials',
  standalone: true,
  imports: [NgRhombusSocialsListComponent],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss'
})
export class NgRhombusAppSocialsComponent implements OnInit {
  socialsService = inject(NgRhombusSocialsService);

  async ngOnInit(): Promise<void> {
    await this.socialsService.fetchAll();
  }
}