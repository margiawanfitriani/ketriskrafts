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

  updateLetterAccuracy() {
    this.setState((this.state.letters = this.state.L));
  }

  render() {
    return (
      <LetterSlot
        Letter={this.state.letters[0][0]}
        onClick={() => {
          this.state.Letters[0][0].IncrementAccuracy();
          this.updateLetterAccuracy();
        }}
      ></LetterSlot>
    );
  }
}

export default Kurdle;
