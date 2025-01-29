import { Injectable, inject, signal } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  setDoc
} from '@angular/fire/firestore';
import { IBlog } from './models/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgRhombusBlogService {

  private firestore = inject(Firestore);
  private blogCollectionRef = collection(this.firestore, 'blog') as CollectionReference<IBlog>;

  blogPosts = signal<IBlog[]>([]);
  selectedBlogPost = signal<IBlog | undefined>(undefined);

  async fetchBlogPosts() {
    const data = await getDocs(query(this.blogCollectionRef));
    return [...data.docs.map(d => ({ ...d.data(), id: d.id })) as IBlog[]];
  }

  // getBlogPosts(): Observable<IBlog[]> {
  //   const blogPostCollectionRef = collection(this.firestore, 'blog') as CollectionReference<IBlog>;
  //   return collectionData(blogPostCollectionRef, {}) as Observable<IBlog[]>;
  // }

  async createBlogPost(title: string, description: string, thumbnail: string, content: string) {
    const blogPostDocumentRef = doc(this.firestore, 'blog', title);
    setDoc(blogPostDocumentRef, {
      title: title,
      description: description,
      thumbnail: thumbnail,
      content: content
    });
  }
}