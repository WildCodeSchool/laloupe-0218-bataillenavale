import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../models/room';
import { Cell } from '../models/cell';
import { Direction } from '../models/direction';
import { Player } from '../models/player';

@Component({
  selector: 'app-boat-position',
  templateUrl: './boat-position.component.html',
  styleUrls: ['./boat-position.component.scss']
})
export class BoatPositionComponent implements OnInit {

  room: any;
  roomId: string;
  grid: { line: Cell[] }[];
  gridp1: { line: Cell[] }[];
  gridp2: { line: Cell[] }[];
  player1: string;
  player2: string;
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
      });
  }

  get me() {
    if (Object.keys(this.room.players)[0] === this.authService.authId) {
      return this.room.players[Object.keys(this.room.players)[0]];
    } else {
      return this.room.players[Object.keys(this.room.players)[1]];
    }
  }

  get opponent() {
    return this.room.player[this.opponentId];
  }

  get opponentId() {
    if (Object.keys(this.room.players)[0] === this.authService.authId) {
      return Object.keys(this.room.players)[1];
    } else {
      return Object.keys(this.room.players)[0];
    }
  }

  newWaterCellTouch(): Cell {
    let cell = new Cell();
    cell.type = 'boat_touched';
    cell.boatId = 0;
    return cell;
  }

  cellClicked(x: number, y: number) {
    if (this.gridp1[y].line[x].type == 'water') {
      alert("Plouf!");
      this.gridp1[y].line[x].type = 'water_missed';
      this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
    } if (this.gridp1[y].line[x].type == 'boat') {
      alert("Touch!");
      this.gridp1[y].line[x].type = 'boat_touched';
      this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
    }
    console.log(x, y);
  }

  changeTurn() {
    this.room.turn = this.room.turn === this.authService.authId ? this.opponentId : this.authService.authId;
    this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
  }
  
  isMyTurn(): boolean {
    return this.room.turn === this.authService.authId;
  }
  
  logout() {
    this.authService.logout();
  }


}

