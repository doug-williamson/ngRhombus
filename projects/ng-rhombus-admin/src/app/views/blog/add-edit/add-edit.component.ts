import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-rhombus-admin-blog-add-edit',
  imports: [MatButton, MatIcon],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class NgRhombusAdminBlogAddEditComponent {

  router = inject(Router);

  routeToBlogPosts() {
    this.router.navigateByUrl(`/blog`);
  }
}
