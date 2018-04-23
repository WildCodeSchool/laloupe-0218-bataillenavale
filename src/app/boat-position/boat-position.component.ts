
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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

  room: Room;
  roomId: string;
  isMyTurn: boolean;
  message: string;
  constructor(private db: AngularFirestore, private authService: AuthService, private route: ActivatedRoute, private router: Router ) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.db
      .doc<Room>('rooms/' + this.roomId)
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        this.updateScroll();
        console.log(room);
      });
  }

  get me(): Player {
    if (!this.room || !this.room.players) {
      return null;
    }
    if (Object.keys(this.room.players)[0] === this.authService.authId) {
      return this.room.players[Object.keys(this.room.players)[0]];
    } else {
      return this.room.players[Object.keys(this.room.players)[1]];
    }
  }

  get opponent(): Player {
    if (!this.room || !this.room.players) {
      return null;
    }
    return this.room.players[this.opponentId];
  }

  get opponentId() {
    if (!this.room || !this.room.players) {
      return null;
    }
    if (Object.keys(this.room.players)[0] === this.authService.authId) {
      return Object.keys(this.room.players)[1];
    } else {
      return Object.keys(this.room.players)[0];
    }
  }

  newWaterCellTouch(): Cell {
    const cell = new Cell();
    cell.type = 'boat_touched';
    cell.boatId = 0;
    return cell;
  }

  newBoatSunk(): Cell {
    const cell = new Cell();
    cell.type = 'boat_sunk';
    cell.boatId = 0;
    return cell;
  }

  newWaterMissing(): Cell {
    const cell = new Cell();
    cell.type = 'water_missed';
    cell.boatId = 0;
    return cell;
  }

  cellClicked(x: number, y: number) {
    if (this.handleTurn()) {
      this.changeTurn();
      if (this.opponent.grid[y].line[x].type === 'water') {
        alert('Plouf!');
        this.opponent.grid[y].line[x].type = 'water_missed';
        this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
      }
      if (this.opponent.grid[y].line[x].type === 'boat') {
        this.opponent.grid[y].line[x].type = 'boat_touched';
        if (this.isSunkBoat(this.opponent.grid[y].line[x].boatId)) {
          this.setSunkBoat(this.opponent.grid[y].line[x].boatId);
          alert('Sunk!');
        } else {
          alert('Touch!');
        }
        this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
      }
      if (this.isAllBoatSunk()) {
        alert('Win!');
        this.router.navigate(['']);
      }
    } else {
      alert('It is not your turn captain!');
    }
  }

  isSunkBoat(boatId: number) {
    let y = 0;
    while (y < 10) {
      let x = 0;
      while (x < 10) {
        const boat = this.opponent.grid[y].line[x];
        if (boat.boatId === boatId && boat.type === 'boat') {
          return false;
        }
        x++;
      }
      y++;
    }
    return true;
  }

  setSunkBoat(boatId: number) {
    let y = 0;
    while (y < 10) {
      let x = 0;
      while (x < 10) {
        const boat = this.opponent.grid[y].line[x];
        if (boat.boatId === boatId) {
          boat.type = 'boat_sunk';
        }
        x++;
      }
      y++;
    }
  }

  isAllBoatSunk() {
    let y = 0;
    while (y < 10) {
      let x = 0;
      while (x < 10) {
        const boat = this.opponent.grid[y].line[x];
        if (boat.type === 'boat') {
          return false;
        }
        x++;
      }
      y++;
    }
    return true;
  }

  changeTurn() {
    this.room.turn = this.room.turn === this.authService.authId ? this.opponentId : this.authService.authId;
    this.db.doc('rooms/' + this.roomId).update(JSON.parse(JSON.stringify(this.room)));
  }

  handleTurn(): boolean {
    return this.room.turn === this.authService.authId;
  }

  logout() {
    this.authService.logout();
  }

  chat() {
    this.room.chat[this.room.chat.length] = this.me.name + ' : ' + this.message;
    console.log(this.me.name);
    this.db.doc<Room>('rooms/' + this.roomId).update(this.room);
    this.message = '';
  }

  updateScroll() {
    const element = document.getElementById('chat');
    if (element) {
      console.log(element);
      element.scrollTop = element.scrollHeight;
    }
  }
}

