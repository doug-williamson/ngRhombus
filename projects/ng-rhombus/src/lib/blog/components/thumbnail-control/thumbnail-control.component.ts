
import { Component, computed, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NgRhombusBlogPostThumbnailService } from '../../services/thumbnail.service';
import { getDownloadURL } from '@angular/fire/storage';
import { MatIconModule } from '@angular/material/icon';
import { NgRhombusBlogThumbnailComponent } from "../thumbnail/thumbnail.component";
import { NgRhombusBlogDeleteThumbnailComponent } from '../dialogs/delete-thumbnail/delete-thumbnail.component';

@Component({
  selector: 'ng-rhombus-thumbnail-control',
  imports: [MatButtonModule, MatIconModule, NgRhombusBlogThumbnailComponent],
  templateUrl: './thumbnail-control.component.html',
  styleUrl: './thumbnail-control.component.scss'
})
export class ThumbnailControlComponent {
  width = input<number>(0);
  height = input<number>(0);
  thumbnailSrc = input<string>('');
  disabled = input<boolean>(false);

  @ViewChild('thumbnailInput') thumbnailInput!: ElementRef;

  thumbnailService = inject(NgRhombusBlogPostThumbnailService);
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
    const dialogRef = this.dialog.open(NgRhombusBlogDeleteThumbnailComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.thumbnailService.deleteImage(this.uploadedFile()).then(() => {
          this.uploadedFile.set(undefined);
          this.thumbnailInput.nativeElement.value = '';
          this.onFileDeleted.emit();
        });
      }
    });
  }
}
