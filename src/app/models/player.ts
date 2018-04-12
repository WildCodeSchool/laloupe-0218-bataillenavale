import { Cell } from "./cell";

export class Player {
  name: string;
  id: string;
  grid: { line: Cell[] }[];
}