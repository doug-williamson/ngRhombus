import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThumbnailControlComponent } from "../thumbnail-control/thumbnail-control.component";
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { NgRhombusBlogService } from '../../blog.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'ng-rhombus-blog-form',
	imports: [MarkdownModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule, ReactiveFormsModule, TextFieldModule, ThumbnailControlComponent, MatToolbarModule, MatIconModule],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class NgRhombusBlogAddEditComponent {
	contentData = signal<string>('');
	blogPostForm!: FormGroup;

	formBuilder = inject(FormBuilder);
	router = inject(Router);
	blogService = inject(NgRhombusBlogService);

	@ViewChild('autosize') autosize?: CdkTextareaAutosize;

	constructor() { }

	ngOnInit(): void {
		this.blogPostForm = this.formBuilder.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			thumbnail: ['', Validators.required],
			content: ['', Validators.required]
		});
	}

	onContentChange() {
		this.contentData.set(this.blogPostForm.getRawValue().content);
	}

	onFileUploaded(downloadUrl: string) {
		this.blogPostForm.patchValue({
			thumbnail: downloadUrl
		});
	}

	onCancelClick() {
		this.router.navigateByUrl('/blog');
	}

	onSubmit() {
		console.log(this.blogPostForm);
		if (this.blogPostForm.invalid) {
			return;
		}

		this.blogService.createBlogPost(
			this.blogPostForm.getRawValue().title,
			this.blogPostForm.getRawValue().description,
			this.blogPostForm.getRawValue().thumbnail,
			this.blogPostForm.getRawValue().content
		)
	}
}
