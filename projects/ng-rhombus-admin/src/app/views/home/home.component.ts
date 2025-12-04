import { Component, inject, OnInit } from '@angular/core';
import { NgRhombusHomeAdminComponent, WrapperService } from '../../../../../ng-rhombus/src/public-api';
import { IHome } from '../../../../../ng-rhombus/src/lib/home/models/home';
import { NgRhombusHomeService } from '../../../../../ng-rhombus/src/lib/home/home.service';

@Component({
  selector: 'app-home',
  imports: [NgRhombusHomeAdminComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class NgRhombusAdminHomeComponent implements OnInit {
  homeService = inject(NgRhombusHomeService);
  wrapperService = inject(WrapperService)

  ngOnInit(): void {
    this.homeService.fetchTopHomeDocument();
  }

  onCancelEvent() {
    // this.routeToBlogCollection();
  }

  onSubmitEvent(submittedHomeAdmin: IHome) {
    this.homeService.saveOrUpdateHomeDocument(submittedHomeAdmin).then(() => {
      this.wrapperService.openSnackbar('Home Admin Data saved!');
    });
  }
}
