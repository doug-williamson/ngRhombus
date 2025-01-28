import { Injectable, inject, signal } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  setDoc
} from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
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

  // async fetchBlogPosts() {
  //   const data = await getDocs(this.blogCollection);

  //   return [...data.docs.map(d => ({ ...d.data(), id: d.id })) as IBlog[]];
  // }

  getBlogPosts(): Observable<IBlog[]> {
    console.log('Doug: ', collectionData(this.blogCollectionRef) as Observable<IBlog[]>)
    return collectionData(this.blogCollectionRef) as Observable<IBlog[]>;
  }

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