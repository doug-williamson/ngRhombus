import { Injectable, inject, signal } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
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
    const data = await getDocs(this.blogCollectionRef);
    const returnData = [...data.docs.map(d => ({ ...d.data(), id: d.id })) as IBlog[]];
    this.blogPosts.set(returnData);
    return returnData;
  }

  async fetchBlogPost(id: string) {
    const blogPostDocumentRef = doc(this.firestore, 'blog', id);
    // const docSnap = (await getDoc(blogPostDocumentRef)).data() as IBlog
    // this.selectedBlogPost.set(docSnap);
    // return docSnap;
    const docSnap = await getDoc(blogPostDocumentRef);
    if (docSnap.exists()) {
      const docData = { ...docSnap.data(), id: id } as IBlog;
      this.selectedBlogPost.set(docData);
      return docData;
    } else {
      return;
    }
  }

  async fetchLatestBlogPost() {
    const latestQuery = query(this.blogCollectionRef, orderBy('timestamp', 'desc'), limit(1));
    const snapshot = await getDocs(latestQuery);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const latestPost = { ...doc.data(), id: doc.id } as IBlog;
      this.selectedBlogPost.set(latestPost);
      return latestPost;
    }
    return undefined;
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