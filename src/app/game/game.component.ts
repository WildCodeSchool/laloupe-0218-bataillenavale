import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
/* import { Cell } from '../models/cell'; */


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  // Google Authentification //
  user: Observable<firebase.User>;
  
  authenticated = false;
  constructor(public af: AngularFireAuth, db: AngularFirestore) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    );
   }
  
   logout() {
    this.af.auth.signOut();
    this.authenticated = false;
  }

  ngOnInit() {
  }
}