import { inject, Injectable } from "@angular/core";
import { ref, Storage, uploadBytesResumable, UploadTask } from "@angular/fire/storage";

@Injectable({
	providedIn: 'root'
})
export class ThumbnailControlService {
	firebaseStorage = inject(Storage);

	uploadImage(imageName: string, image: File): UploadTask {
		const storageRef = ref(this.firebaseStorage, `thumbnails/${imageName}`);
		return uploadBytesResumable(storageRef, image);
	}

	deleteImage(filePath: string) {
		// const storageRef = this.firebaseStorage.ref(filePath);
	}
}