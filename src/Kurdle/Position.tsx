export enum Color {
  Nothing = -1,
  Grey = 0,
  Yellow = 1,
  Green = 2,
}

export class Position {
  Letter: string = '';
  Accuracy: Color = Color.Nothing;
  Index: number;

  constructor(letter: string, accuracy: number, index: number) {
    this.Letter = letter;
    this.Accuracy = accuracy;
    this.Index = index;
  }
}