// ...existing code...
import { Injectable, inject, signal, Injector, runInInjectionContext } from '@angular/core';
import {
    Firestore, CollectionReference, DocumentReference,
    collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc,
    query, orderBy, serverTimestamp
} from '@angular/fire/firestore';

export enum SocialsSource {
    Twitch = 'Twitch',
    YouTube = 'YouTube',
    Instagram = 'Instagram',
    TikTok = 'TikTok',
    Bluesky = 'Bluesky'
}

export interface ISocial {
    id: string;
    source: SocialsSource;
    url: string;
}

@Injectable({ providedIn: 'root' })
export class NgRhombusSocialsService {
    private firestore = inject(Firestore);
    private injector = inject(Injector);
    private socialsRef = collection(this.firestore, 'socials') as CollectionReference<ISocial>;

    socials = signal<ISocial[]>([]);

    // List
    async fetchAll(): Promise<ISocial[]> {
        const q = query(this.socialsRef, orderBy('source', 'asc'));
        const snap = await runInInjectionContext(this.injector, () => getDocs(q));
        const items = snap.docs.map(d => ({ ...(d.data() as ISocial), id: d.id, }));
        this.socials.set(items);
        return items;
    }

    // Read by id
    async fetchById(id: string): Promise<ISocial | undefined> {
        const ref = doc(this.socialsRef, id) as DocumentReference<ISocial>;
        const d = await runInInjectionContext(this.injector, () => getDoc(ref));
        return d.exists() ? ({ ...(d.data() as ISocial), id: d.id, }) : undefined;
    }

    // Create (auto-id)
    async create(social: Omit<ISocial, 'id'>): Promise<string> {
        const payload = { ...social, updatedAt: serverTimestamp() } as any;
        const newDoc = await runInInjectionContext(this.injector, () => addDoc(this.socialsRef, payload));
        // Optimistic cache update
        this.socials.set([...this.socials(), { ...(social as ISocial), id: newDoc.id, }]);
        return newDoc.id;
    }

    // Update (partial)
    async update(id: string, patch: Partial<Omit<ISocial, 'id'>>): Promise<void> {
        const ref = doc(this.socialsRef, id) as DocumentReference<ISocial>;
        await runInInjectionContext(this.injector, () => updateDoc(ref, { ...patch, updatedAt: serverTimestamp() } as any));
        this.socials.set(this.socials().map(s => (s.id === id ? { ...s, ...(patch as ISocial) } : s)));
    }

    // Delete
    async remove(id: string): Promise<void> {
        const ref = doc(this.socialsRef, id) as DocumentReference<ISocial>;
        await runInInjectionContext(this.injector, () => deleteDoc(ref));
        this.socials.set(this.socials().filter(s => s.id !== id));
    }
}
// ...existing code...