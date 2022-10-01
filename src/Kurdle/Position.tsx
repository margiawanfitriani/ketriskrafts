export class Position {
  Letter: string = '';
  Accuracy: number = -1; //-1 is no entry, 0 is grey, 1 is yellow, 2 is green
  Index: number;

  constructor(letter: string, accuracy: number, index: number) {
    this.Letter = letter;
    this.Accuracy = accuracy;
    this.Index = index;
  }
}
