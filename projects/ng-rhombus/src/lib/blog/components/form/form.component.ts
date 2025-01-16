import { Component, input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IBlog } from '../../models/blog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThumbnailControlComponent } from "../thumbnail-control/thumbnail-control.component";

@Component({
	selector: 'ng-rhombus-blog-form',
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, ThumbnailControlComponent],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class NgRhombusBlogAddEditComponent {
	selectedBlogPost = input<IBlog>();
	blogForm!: FormGroup;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		if (this.selectedBlogPost()) {
			const blogPost = this.selectedBlogPost();
			this.blogForm = this.formBuilder.group({
				title: [blogPost?.title, Validators.required]
			})
		}
	}
}
