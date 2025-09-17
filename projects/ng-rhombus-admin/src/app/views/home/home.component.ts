import { Component } from '@angular/core';
import { NgRhombusHomeAdminComponent } from '../../../../../ng-rhombus/src/public-api';
import { IHome } from '../../../../../ng-rhombus/src/lib/home/models/home';

@Component({
  selector: 'app-home',
  imports: [NgRhombusHomeAdminComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  onCancelEvent() {
    // this.routeToBlogCollection();
  }

  onSubmitEvent(submittedHomeAdmin: IHome) {
    this.blogService.createBlogPost(submittedBlogPost).then(() => {
      // display 'New Blog Post Added' alert, redirect back to collection
      this.wrapperService.openSnackbar('Blog Post added!');
      this.routeToBlogCollection();
    });
  }
}
