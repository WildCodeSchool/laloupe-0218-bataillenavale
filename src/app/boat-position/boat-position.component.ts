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

@Component({
  selector: 'app-boat-position',
  templateUrl: './boat-position.component.html',
  styleUrls: ['./boat-position.component.scss']
})
export class BoatPositionComponent implements OnInit {

  room: any;
  roomId: string;
  grid: { line: Cell[] }[];
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
        if (!this.grid) {
          this.createGridWithWater();
          this.addBoats(1, 5, 1);
          this.addBoats(1, 4, 2);
          this.addBoats(2, 3, 3);
          this.addBoats(1, 2, 5);
          console.log(this.grid);
        }
      });

  }

  newWaterCell(): Cell {
    let cell = new Cell();
    cell.type = 'water';
    cell.boatId = 0;
    return cell;
  }

  newWaterCellTouch(): Cell {
    let cell = new Cell();
    cell.type = 'boattouch';
    cell.boatId = 0;
    return cell;
  }

  newBoatCell(boatId: number): Cell {
    let cell = new Cell();
    cell.type = 'boat';
    cell.boatId = boatId;
    return cell;
  }

  createGridWithWater() {
    this.grid = new Array(this.room.gridsize);
    let i = 0;
    while (i < this.room.gridsize) {
      this.grid[i] = { line: Array(10) };
      i++;
    }
    let y = 0;
    while (y < this.room.gridsize) {
      let x = 0;
      while (x < this.room.gridsize) {
        this.grid[y].line[x] = this.newWaterCell();
        x++;
      }
      y++;
    }
    console.log(this.grid);
  }

  generateDirection(): Direction {
    let n = Math.floor(Math.random() * 4);
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

  addBoats(boatNumber: number, boatSize: number, firstBoatId: number) {
    let numBoats = 0;
    while (numBoats != boatNumber) {
      let posY = this.generatePosition(this.grid.length);
      let posX = this.generatePosition(this.grid[0].line.length);
      let direction = this.generateDirection();
      if (this.canPlaceBoat(boatSize, posX, posY, direction)) {
        this.addBoatToGrid(boatSize, posX, posY, direction, firstBoatId);
        numBoats++;
        firstBoatId++;
      }
    }
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
      if (this.grid[posY + yIncrement * i].line[posX + xIncrement * i].type != 'water') {
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
      this.grid[posY + yIncrement * i].line[posX + xIncrement * i] = this.newBoatCell(boatId);;
      i++;
    }
  }

  cellClicked(x: number, y: number) {
    if (this.grid[y].line[x].type == 'water') {
      alert("Plouf! in the water");
    } if (this.grid[y].line[x].type == 'boat') {
      return this.grid[y].line[x].type = 'boattouch';
    }
  }

  logout() {
    this.authService.logout();
  }


}

