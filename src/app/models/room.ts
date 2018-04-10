import { Cell } from './cell';
import { Player } from './player';

export class Room {
  deck: Cell[];
  graveyard: Cell[];
  players: {};
  turn: string;
  winner: string;
}