import { Injectable, inject, signal } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection
} from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { IBlog } from './models/blog';

@Injectable({
  providedIn: 'root',
})
export class NgRhombusBlogService {

  private firestore = inject(Firestore);
  private blogCollection = collection(this.firestore, 'blog') as CollectionReference<IBlog>;

  blogPosts = signal<IBlog[]>([]);
  selectedBlogPost = signal<IBlog | undefined>(undefined);

  async fetchBlogPosts() {
    const data = await getDocs(this.blogCollection);

    return [...data.docs.map(d => ({ ...d.data(), id: d.id })) as IBlog[]];
  }
}