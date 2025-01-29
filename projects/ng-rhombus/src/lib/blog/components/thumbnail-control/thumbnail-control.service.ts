import { inject, Injectable } from "@angular/core";
import { ref, Storage, uploadBytesResumable, UploadTask } from "@angular/fire/storage";
import { deleteObject } from "firebase/storage";

@Injectable({
	providedIn: 'root'
})
export class ThumbnailControlService {
	firebaseStorage = inject(Storage);

	uploadImage(imageName: string, image: File): UploadTask {
		const storageRef = ref(this.firebaseStorage, `thumbnails/${imageName}`);
		return uploadBytesResumable(storageRef, image);
	}

	deleteImage(filePath?: string) {
		const storageDocRef = ref(this.firebaseStorage, filePath);

		return deleteObject(storageDocRef).then(() => {

		}).catch((error) => {

		});
	}
}