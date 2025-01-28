import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThumbnailControlComponent } from "../thumbnail-control/thumbnail-control.component";
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
	selector: 'ng-rhombus-blog-form',
	imports: [MarkdownModule, CommonModule, MatButton, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule, ReactiveFormsModule, TextFieldModule, ThumbnailControlComponent],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class NgRhombusBlogAddEditComponent {
	contentData = signal<string>('');
	blogPostForm!: FormGroup;

	formBuilder = inject(FormBuilder);
	router = inject(Router);

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
	}
}
