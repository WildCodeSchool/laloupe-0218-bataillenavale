import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  authenticated = false;
  
  constructor(public af: AngularFireAuth, private router: Router, ) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    );
  }
  ngOnInit() {

  }
  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.authenticated = true;
  }

  logout() {
    this.af.auth.signOut();
    this.authenticated = false;
  }
}
