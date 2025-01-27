import { Timestamp } from "@angular/fire/firestore";

export interface IBlog {
	id: string;
	title: string;
	description: string;
    thumbnail: string;
	content: string;
    timestamp: Timestamp;
}