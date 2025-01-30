import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ThumbnailControlService } from './thumbnail-control.service';
import { getDownloadURL } from '@angular/fire/storage';
import { MatIconModule } from '@angular/material/icon';
import { NgRhombusBlogThumbnailComponent } from "../thumbnail/thumbnail.component";

@Component({
  selector: 'ng-rhombus-thumbnail-control',
  imports: [CommonModule, MatButtonModule, MatIconModule, NgRhombusBlogThumbnailComponent],
  templateUrl: './thumbnail-control.component.html',
  styleUrl: './thumbnail-control.component.scss'
})
export class ThumbnailControlComponent {
  width = input<number>(0);
  height = input<number>(0);

  @ViewChild('thumbnailInput') thumbnailInput!: ElementRef;

  thumbnailService = inject(ThumbnailControlService);
  dialog = inject(MatDialog);

  onFileUploaded = output<string>();
  onFileDeleted = output<void>();

  uploadedFile = signal<string | undefined>(undefined);
  placeholder = computed(() => `https://placehold.co/${this.width()}x${this.height()}`);
  imageSource = computed(() => { return this.uploadedFile() ?? this.placeholder(); })

  onThumbnailSelected(input: HTMLInputElement) {
    if (!input.files || input.files.length <= 0) {
      return;
    }
    const file: File = input.files[0];

    this.thumbnailService.uploadImage(file.name, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        this.uploadedFile.set(downloadUrl);
        this.onFileUploaded.emit(downloadUrl);
      })
    })
  }

  onThumbnailDeleted() {
    this.thumbnailService.deleteImage(this.uploadedFile()).then(() => {
      this.uploadedFile.set(undefined);
      this.thumbnailInput.nativeElement.value = '';
      this.onFileDeleted.emit();
    })
  }
}
