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
export class HomeComponent implements OnInit {
  homeService = inject(NgRhombusHomeService);
  wrapperService = inject(WrapperService)

  ngOnInit(): void {
    void this.homeService.fetchTopHomeDocument();
  }

  onCancelEvent() {
    // this.routeToBlogCollection();
  }

  onSubmitEvent(submittedHomeAdmin: IHome) {
    // this.blogService.createBlogPost(submittedBlogPost).then(() => {
    //   // display 'New Blog Post Added' alert, redirect back to collection
    //   this.wrapperService.openSnackbar('Blog Post added!');
    //   this.routeToBlogCollection();
    // });
    this.homeService.saveOrUpdateHomeDocument(submittedHomeAdmin).then(() => {
      // display 'Home Admin Data Saved' alert, redirect back to collection
      this.wrapperService.openSnackbar('Home Admin Data saved!');
    });
  }
}
