import { Injectable, inject, signal } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import { IBlog } from '../models/blog';
import { NgRhombusBlogPostHelper } from '../helpers/blog-post-helper';

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

  async createBlogPost(blogPost: IBlog) {
    const blogPostDocumentRef = doc(this.firestore, 'blog', NgRhombusBlogPostHelper.createSlug(blogPost.title));
    setDoc(blogPostDocumentRef, {
      title: blogPost.title,
      description: blogPost.description,
      thumbnail: blogPost.thumbnail,
      content: blogPost.content,
      timestamp: new Date()
    });
  }

  async updateBlogPost(blogPost: IBlog) {
    const blogPostDocumentRef = doc(this.firestore, 'blog', blogPost.id);
    updateDoc(blogPostDocumentRef, {
      title: blogPost.title,
      description: blogPost.description,
      thumbnail: blogPost.thumbnail,
      content: blogPost.content,
    })
  }


  deleteBlogPost(id: string) {
    const blogPostDocumentRef = doc(this.firestore, 'blog', id);
    return deleteDoc(blogPostDocumentRef);
  }
}