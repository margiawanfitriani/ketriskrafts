import LetterSlot from './LetterSlot';
import React from 'react';
import { Letter } from './Letter';

class Kurdle extends React.Component<any, any> {
  constructor(props: any) {
    let Letters: Letter[][] = new Array(6).fill(
      Array(5).fill(new Letter('', -1)),
    );
    super(props);
    this.state = { letters: Letters };
  }

  updateLetterAccuracy(row: number, col: number) {
    this.state.letters[row][col].IncrementAccuracy();
    this.setState({ letters: this.state.letters })
  }

  render() {
    return (
      <LetterSlot
        letter={this.state.letters[0][0]}
        onClick={() => this.updateLetterAccuracy(0, 0)}
      ></LetterSlot >
    );
  }
}

export default Kurdle;
