import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/Rx';


@Component({
  selector: 'app-boat-position',
  templateUrl: './boat-position.component.html',
  styleUrls: ['./boat-position.component.scss']
})
export class BoatPositionComponent implements OnInit {

  user: Observable<firebase.User>;
  items: Observable<any[]>;
  objObservable: Observable<any>;
  boats: Observable<any[]>;
  authenticated = false;
  constructor(public af: AngularFireAuth, private db: AngularFirestore) {

    /* this.items = db.collection('items').valueChanges();
    console.log(this.items);

    this.objObservable = db.doc("items/CN1kSt3xcuujlsakfWFd").valueChanges(); */

    this.generateBoats();

    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      }
    );
  }

  generateBoats() {
    const boatsCollection = this.db.collection('boats');
    boatsCollection.valueChanges().take(1).subscribe(boats => {
      console.log(boats);
    });
  }

  logout() {
    this.af.auth.signOut();
    this.authenticated = false;
  }

  ngOnInit() {
  }
}
