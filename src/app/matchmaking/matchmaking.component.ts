import { AuthService } from './../auth.service';
import { Player } from './../models/player';
import { Room } from './../models/room';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Cell } from '../models/cell';
import { Direction } from '../models/direction';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss'],
})
export class MatchMakingComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  room;
  grid: { line: Cell[] }[];


  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.af.authState.take(1).subscribe((user) => {
      if (user) {
        this.getRooms();
        this.createGridWithWater();
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');

    roomsCollection.snapshotChanges().take(1).subscribe((snapshot) => {
      const player = new Player();
      player.name = this.authService.name;

      for (const snapshotItem of snapshot) {
        const roomId = snapshotItem.payload.doc.id;
        const room = snapshotItem.payload.doc.data() as Room;

        if (Object.keys(room.players).length === 1) {
          room.players[this.authService.authId] = player;
          this.createGridWithWater();
          this.addBoats(1, 5, 1);
          this.addBoats(1, 4, 2);
          this.addBoats(2, 3, 3);
          this.addBoats(1, 2, 5);
          room.players[this.authService.authId].grid = this.grid;
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          this.router.navigate(['boat-position', roomId]);
          return;
        }
      }

      const newRoom = new Room();
      newRoom.players = {};
      newRoom.players[this.authService.authId] = player;
      newRoom.gridsize = 10;
      newRoom.turn = this.authService.authId;
      newRoom.chat = ['Good luck !'];
      this.createGridWithWater();
      this.addBoats(1, 5, 1);
      this.addBoats(1, 4, 2);
      this.addBoats(2, 3, 3);
      this.addBoats(1, 2, 5);
      newRoom.players[this.authService.authId].grid = this.grid;
      this.db.collection('rooms')
        .add(JSON.parse(JSON.stringify(newRoom)))
        .then((doc) => {
          this.router.navigate(['boat-position', doc.id]);
        });
    });
  }


  createGridWithWater() {
    this.grid = new Array(10);
    let i = 0;
    while (i < 10) {
      this.grid[i] = { line: Array(10) };
      i++;
    }
    let y = 0;
    while (y < 10) {
      let x = 0;
      while (x < 10) {
        this.grid[y].line[x] = this.newWaterCell();
        x++;
      }
      y++;
    }
    console.log(this.grid);
    return this.grid;
  }



  newWaterCell(): Cell {
    const cell = new Cell();
    cell.type = 'water';
    cell.boatId = 0;
    return cell;
  }

  addBoats(boatNumber: number, boatSize: number, firstBoatId: number) {
    let numBoats = 0;
    while (numBoats !== boatNumber) {
      const posY = this.generatePosition(this.grid.length);
      const posX = this.generatePosition(this.grid[0].line.length);
      const direction = this.generateDirection();
      if (this.canPlaceBoat(boatSize, posX, posY, direction)) {
        this.addBoatToGrid(boatSize, posX, posY, direction, firstBoatId);
        numBoats++;
        firstBoatId++;
      }
    }
  }

  generateDirection(): Direction {
    const n = Math.floor(Math.random() * 4);
    switch (n) {
      case 0:
        return Direction.Down;
      case 1:
        return Direction.Left;
      case 2:
        return Direction.Right;
      case 3:
      default:
        return Direction.Up;
    }
  }

  generatePosition(size): number {
    return Math.floor(Math.random() * size);
  }

  canPlaceBoat(size: number, posX: number, posY: number, direction: Direction): boolean {
    switch (direction) {
      case Direction.Down:
        if (posY > this.grid.length - size) {
          return false;
        }
        break;
      case Direction.Up:
        if (posY < size - 1) {
          return false;
        }
        break;
      case Direction.Left:
        if (posX < size - 1) {
          return false;
        }
        break;
      case Direction.Right:
        if (posX > this.grid[0].line.length - size) {
          return false;
        }
        break;
    }

    let xIncrement = 0;
    let yIncrement = 0;
    switch (direction) {
      case Direction.Down:
        yIncrement = 1;
        break;
      case Direction.Up:
        yIncrement = -1;
        break;
      case Direction.Left:
        xIncrement = -1;
        break;
      case Direction.Right:
        xIncrement = 1;
        break;
    }

    let i = 0;
    while (i < size) {
      if (this.grid[posY + yIncrement * i].line[posX + xIncrement * i].type !== 'water') {
        return false;
      }
      i++;
    }
    return true;
  }

  addBoatToGrid(size: number, posX: number, posY: number, direction: Direction, boatId: number) {

    let xIncrement = 0;
    let yIncrement = 0;
    switch (direction) {
      case Direction.Down:
        yIncrement = 1;
        break;
      case Direction.Up:
        yIncrement = -1;
        break;
      case Direction.Left:
        xIncrement = -1;
        break;
      case Direction.Right:
        xIncrement = 1;
        break;
    }

    let i = 0;
    while (i < size) {
      this.grid[posY + yIncrement * i].line[posX + xIncrement * i] = this.newBoatCell(boatId);
      i++;
    }
  }

  newBoatCell(boatId: number): Cell {
    const cell = new Cell();
    cell.type = 'boat';
    cell.boatId = boatId;
    return cell;
  }

}

