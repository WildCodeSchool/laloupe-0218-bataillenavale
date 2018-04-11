import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authId: string;
  name: string;
  
  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe((user) => {
      if (user) {
        this.authId = user.uid;
        this.name = user.displayName;
      } else {
        this.authId = null;
        this.name = null;
      }
    });
  }

  get authState() {
    return this.af.authState;
  }

  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.af.auth.signOut(); 
    this.authId = null;
    this.name = null;
  }
}