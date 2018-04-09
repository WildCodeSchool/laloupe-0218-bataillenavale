import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { AngularFirestore } from 'angularfire2/firestore';
import { Cell } from '../models/cell';


@Component({
  selector: 'app-boat-position',
  templateUrl: './boat-position.component.html',
  styleUrls: ['./boat-position.component.scss']
})
export class BoatPositionComponent implements OnInit {
  user: Observable<firebase.User>;
  items: Observable<any[]>;
  objObservable: Observable<any>;

  authenticated = false;
  constructor(public af: AngularFireAuth, db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
    this.objObservable = db.doc("items/CN1kSt3xcuujlsakfWFd").valueChanges();
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
      setInterval(function() {
        $('.textconstruction').animate({'font-size' : '60px'});
        $('.textconstruction').animate({'font-size' : '40px'});
      }, 3000);


  }

}

