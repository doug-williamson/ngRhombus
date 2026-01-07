import { Injectable, inject, signal, Injector, runInInjectionContext } from '@angular/core';
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
import { IHome } from './models/home';


@Injectable({
    providedIn: 'root',
})
export class NgRhombusHomeService {

    private firestore = inject(Firestore);
    private injector = inject(Injector);
    private homeAdminRef = collection(this.firestore, 'home') as CollectionReference<IHome>;

    homeAdminData = signal<IHome | undefined>(undefined);

    async fetchTopHomeDocument() {
        const topQuery = query(this.homeAdminRef, limit(1));
        const snapshot = await runInInjectionContext(this.injector, () => getDocs(topQuery));

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const topHome = { ...doc.data(), id: doc.id } as IHome;
            this.homeAdminData.set(topHome);
            return topHome;
        }
        return undefined;
    }

    async saveOrUpdateHomeDocument(homeData: IHome) {
        const topQuery = query(this.homeAdminRef, limit(1));
        const snapshot = await runInInjectionContext(this.injector, () => getDocs(topQuery));

        if (!snapshot.empty) {
            // Update the existing document
            const docRef = doc(this.firestore, 'home', snapshot.docs[0].id);
            await runInInjectionContext(this.injector, () => updateDoc(docRef, { ...homeData }));
            this.homeAdminData.set({ ...homeData, id: snapshot.docs[0].id });
            return { updated: true, id: snapshot.docs[0].id };
        } else {
            // Save a new document
            const newDocRef = doc(this.homeAdminRef);
            await runInInjectionContext(this.injector, () => setDoc(newDocRef, { ...homeData }));
            this.homeAdminData.set({ ...homeData, id: newDocRef.id });
            return { created: true, id: newDocRef.id };
        }
    }
}