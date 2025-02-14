import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgRhombusAdminAuthenticationService {
  firebaseAuth = inject(Auth);
  currentUser$ = authState(this.firebaseAuth);

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => { });
  }

  logout(): Promise<any> { return this.firebaseAuth.signOut(); }

  private currentUserProfile$ = this.currentUser$.pipe(
    switchMap((user) => {
      return user?.uid ? of(user) : of(null);
    })
  );

  currentUserProfile = toSignal(this.currentUserProfile$);
}