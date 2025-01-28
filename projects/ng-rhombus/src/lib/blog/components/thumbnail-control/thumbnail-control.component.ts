import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ThumbnailControlService } from './thumbnail-control.service';
import { getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'ng-rhombus-thumbnail-control',
  imports: [CommonModule, MatButton],
  templateUrl: './thumbnail-control.component.html',
  styleUrl: './thumbnail-control.component.scss'
})
export class ThumbnailControlComponent {
  width = input<number>(0);
  height = input<number>(0);

  thumbnailService = inject(ThumbnailControlService);
  dialog = inject(MatDialog);

  onFileUploaded = output<string>();

  placeholder = computed(() => `https://placehold.co/${this.width()}x${this.height()}`);
  uploadedFile = signal<string | undefined>(undefined);
  imageSource = computed(() => {
    return this.uploadedFile() ?? this.placeholder();
  })
  thumbnailSource = computed(() => { });

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
    // this.thumbnailService.deleteImage
  }
}
