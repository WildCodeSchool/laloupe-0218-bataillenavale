import { Board } from './board';
import { Player } from './player';

export class Room {
  deck: Board[];
  graveyard: Board[];
  players: {};
  turn: string;
  winner: string;
}