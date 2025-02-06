import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface AuthenticationResponse {
	token: string;
	expiration: string;
}

@Injectable({
	providedIn: 'root'
})
export class NgRhombusAuthenticationService {

	firestore = inject(Firestore);
	firebaseAuth = inject(Auth);
	currentUser$ = authState(this.firebaseAuth);

	login(email: string, password: string): Observable<void> {
		return from(signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => { }));
	}

	logout(): Promise<any> { return this.firebaseAuth.signOut(); }

	private currentUserProfile$ = this.currentUser$.pipe(
		switchMap((user) => {
			return user?.uid ? of(user) : of(null);
		})
	);

	currentUserProfile = toSignal(this.currentUserProfile$);
}