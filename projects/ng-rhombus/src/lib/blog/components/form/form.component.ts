import { Component, input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IBlog } from '../../models/blog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThumbnailControlComponent } from "../thumbnail-control/thumbnail-control.component";
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
	selector: 'ng-rhombus-blog-form',
	imports: [MatButton, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule, ThumbnailControlComponent],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class NgRhombusBlogAddEditComponent {
	selectedBlogPost = input<IBlog>();
	blogPostForm!: FormGroup;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		if (this.selectedBlogPost()) {
			const blogPost = this.selectedBlogPost();
			this.blogPostForm = this.formBuilder.group({
				title: [blogPost?.title, Validators.required],
                description: [blogPost?.description, Validators.required]
			});
		}
	}

    onSubmit() {
        
    }
}
