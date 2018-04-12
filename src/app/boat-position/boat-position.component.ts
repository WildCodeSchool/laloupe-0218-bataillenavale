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
      .take(1)
      .subscribe((room) => {
        this.room = room;
        console.log(room);
        this.player1 = this.room.players[Object.keys(this.room.players)[0]].name;
        this.player2 = this.room.players[Object.keys(this.room.players)[1]].name;
        this.gridp1 = this.room.players[Object.keys(this.room.players)[0]].grid;
        this.gridp2 = this.room.players[Object.keys(this.room.players)[1]].grid;
      });
  }

  newWaterCellTouch(): Cell {
    let cell = new Cell();
    cell.type = 'boattouch';
    cell.boatId = 0;
    return cell;
  }

  cellClicked(x: number, y: number) {
    if (this.gridp1[y].line[x].type == 'water') {
      alert("Plouf!");
      this.gridp1[y].line[x].type = 'water';
      this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
    } if (this.gridp1[y].line[x].type == 'boat') {
      alert("Touch!");
      this.gridp1[y].line[x].type = 'boattouch';
      this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
    }
    console.log(x, y);
  }

  logout() {
    this.authService.logout();
  }


}

