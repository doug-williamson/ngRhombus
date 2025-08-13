import { Component, effect, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThumbnailControlComponent } from "../thumbnail-control/thumbnail-control.component";
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { IBlog } from '../../models/blog';
import { NgRhombusBlogPostComponent, NgRhombusBlogPostThumbnailService } from '../../public-api';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

@Component({
	selector: 'ng-rhombus-blog-form',
	imports: [MatListModule, MatDividerModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSidenavModule, ReactiveFormsModule, TextFieldModule, ThumbnailControlComponent, MatToolbarModule, MatIconModule, NgRhombusBlogPostComponent],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class NgRhombusBlogAddEditComponent {
	blogPost = input<IBlog | undefined>(undefined);
	cancelEvent = output<void>();
	submitEvent = output<IBlog>();

	contentData = signal<string>('');
	blogPostForm!: FormGroup;

	dialog = inject(MatDialog);
	thumbnailService = inject(NgRhombusBlogPostThumbnailService);
	formBuilder = inject(FormBuilder);

	@ViewChild('autosize') autosize?: CdkTextareaAutosize;
	@ViewChild('blogPost') blogPostPreview!: ElementRef;

	markdown = `## Markdown __rulez__!
	---

	### Syntax highlight
	\`\`\`typescript
	const language = 'typescript';
	\`\`\`

	### Lists
	1. Ordered list
	2. Another bullet point
	- Unordered list
	- Another unordered bullet

	### Blockquote
	> Blockquote to the max`;

	constructor() {
		effect(() => {
			if (this.blogPost()) {
				this.blogPostForm.patchValue({
					title: this.blogPost()?.title,
					description: this.blogPost()?.description,
					thumbnail: this.blogPost()?.thumbnail,
					content: this.blogPost()?.content,
				});
			}
			this.onContentChange();
		})
	}

	ngOnInit(): void {
		this.blogPostForm = this.formBuilder.group({
			title: [this.blogPost()?.title, Validators.required],
			description: [this.blogPost()?.description, Validators.required],
			thumbnail: [this.blogPost()?.thumbnail, Validators.required],
			content: [this.blogPost()?.content, Validators.required]
		});
	}

	onContentChange() {
		this.contentData.set(this.blogPostForm.getRawValue().content);
	}

	get thumbnailSource() {
		return this.blogPostForm.getRawValue().thumbnail;
	}

	onFileUploaded(downloadUrl: string) {
		this.blogPostForm.patchValue({
			thumbnail: downloadUrl
		});
		this.blogPostForm.markAsDirty();
	}

	onFileDeleted() {
		this.blogPostForm.patchValue({
			thumbnail: ''
		})
	}

	onCancelClick() {
		if (this.blogPost()) {
			// EDIT form
			if (this.blogPostForm.dirty) {
				const dialogRef = this.dialog.open(NgRhombusBlogConfirmationComponent, {
					data: {
						header: 'Cancel Revision',
						query: 'Are you sure? You will lose your revision(s).'
					}
				});

				dialogRef.afterClosed().subscribe(result => {
					if (result) {
						this.cancelEvent.emit();
					}
				});
			} else {
				this.cancelEvent.emit();
			}
		} else {
			// CREATE form
			if (this.blogPostForm.dirty) {
				const dialogRef = this.dialog.open(NgRhombusBlogConfirmationComponent, {
					data: {
						header: 'Cancel Create',
						query: 'Are you sure? You will lose your progress.'
					}
				});

				dialogRef.afterClosed().subscribe(result => {
					if (result) {
						if (this.blogPostForm.getRawValue().thumbnail) {
							this.thumbnailService.deleteImage(this.blogPostForm.getRawValue().thumbnail).then(() => {
								this.onFileDeleted();
								this.cancelEvent.emit();
							});
						}
						this.cancelEvent.emit();
					}
				});
			} else {
				this.cancelEvent.emit();
			}
		}
	}

	onSubmit() {
		if (this.blogPostForm.invalid) {
			return;
		}

		const rawData: IBlog = this.blogPostForm.getRawValue();
		let submittedBlogPost = new IBlog();
		if (this.blogPost()) {
			submittedBlogPost.id = this.blogPost()!.id;
		}

		submittedBlogPost.title = rawData.title;
		submittedBlogPost.description = rawData.description;
		submittedBlogPost.thumbnail = rawData.thumbnail;
		submittedBlogPost.content = rawData.content;

		this.submitEvent.emit(submittedBlogPost);
	}
}
