import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../models/room';



@Component({
  selector: 'app-boat-position',
  templateUrl: './boat-position.component.html',
  styleUrls: ['./boat-position.component.scss']
})
export class BoatPositionComponent implements OnInit {

  room: any;
  roomId: string;
  grid: string[][];
  constructor(private db: AngularFirestore, private authService: AuthService, private route: ActivatedRoute, ) {

  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        console.log(room);
        this.grid
        if (!this.grid) {
          this.grid = [];
          for (let index = 0; index < this.room.gridsize; index++) {
            this.grid[index] = Object.keys(Array.apply(0, Array(this.room.gridsize)));

          }
          console.log(this.grid);
          
        }
      });

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