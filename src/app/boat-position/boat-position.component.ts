import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
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

  constructor(private db: AngularFirestore, private authService: AuthService) {

  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }


}



/* user: Observable<firebase.User>;
  items: Observable<any[]>;
  objObservable: Observable<any>;
  boats: Observable<any[]>; */


 /*  generateBoats() {
    let boatsCollection = this.db.collection('boats');
    boatsCollection.valueChanges()
      .take(1)
      .subscribe(boats => {
        console.log(boats);
      });
  } */





  /* this.generateBoats(); */