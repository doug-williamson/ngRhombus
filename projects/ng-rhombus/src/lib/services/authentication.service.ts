import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface AuthenticationResponse {
	token: string;
	expiration: string;
}

export interface UserCredentials {
	email: string;
	password: string;
}

// export interface ProfileUser {
//   uid: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   displayName?: string;
//   phone?: string;
//   address?: string;
//   photoURL?: string;
// }

@Injectable({
  providedIn: 'root'
})
export class NgRhombusAuthenticationService {

  firestore = inject(Firestore);
  firebaseAuth = inject(Auth);
  currentUser$ = authState(this.firebaseAuth);
  
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }

  logout(): Promise<any> {
    return this.firebaseAuth.signOut();
  }

  private currentUserProfile$ = this.currentUser$.pipe(
    switchMap((user) => {
      console.log('Doug')
      if (!user?.uid) {
        return of(null);
      }
      console.log('User: ', user);
      const ref = doc(this.firestore, 'users', user?.uid);
      // console.log('docData(ref) as Observable<ProfileUser>: ', docData(ref) as Observable<ProfileUser>)
      // return docData(ref) as Observable<ProfileUser>;
      return of(user);
    })
  );

  currentUserProfile = toSignal(this.currentUserProfile$);
}