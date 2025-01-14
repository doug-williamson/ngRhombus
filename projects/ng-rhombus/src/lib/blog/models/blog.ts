import { Timestamp } from "@angular/fire/firestore";

export interface IBlogParagraph {
	id: string;
	text: string;
	order: number;
}

export interface IBlog {
	id: string;
	timestamp: Timestamp;
	title: string;
	description: string;
	paragraphs: Array<IBlogParagraph>;
}