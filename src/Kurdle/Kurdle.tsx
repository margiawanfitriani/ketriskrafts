import LetterSlot from './LetterSlot';
import React from 'react';
import { Letter } from './Letter';
import { deepCopy } from '../Utilities/deepCopy';
import Grid from '@mui/material/Grid'; // Grid version 1
import './Kurdle.css';
import { readInWords } from './WordProcessor';
import { AddFriendForm } from '../Dexie/db';

type myState = {
  letters: Letter[][];
};

class Kurdle extends React.Component<any, myState> {
  constructor(props: any) {
    let possibleWords = readInWords();
    super(props);
    this.state = {
      letters: new Array(5).fill(Array(6).fill(new Letter('', -1))),
    };
  }

  updateLetterAccuracy(row: number, col: number) {
    let copiedLetters: Letter[][] = deepCopy(this.state.letters);
    if (++copiedLetters[row][col].Accuracy === 3) {
      copiedLetters[row][col].Accuracy = -1;
    }

    this.setState({ letters: deepCopy(copiedLetters) });
  }

  updateLetterValue(
    row: number,
    col: number,
    event: React.FormEvent<HTMLInputElement>,
  ) {
    let copiedLetters: Letter[][] = deepCopy(this.state.letters);

    copiedLetters[row][col].Letter = event.currentTarget.value;
    this.setState({
      letters: deepCopy(copiedLetters),
    });
  }

  render() {
    return (
      <div>
        <Grid
          container
          style={{ marginTop: '10vh' }}
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          {this.state.letters.map((row, rowIndex) => {
            return (
              <Grid key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Grid item>
                    <LetterSlot
                      letter={this.state.letters[rowIndex][colIndex]}
                      onClick={() =>
                        this.updateLetterAccuracy(rowIndex, colIndex)
                      }
                      onChange={(event: React.FormEvent<HTMLInputElement>) =>
                        this.updateLetterValue(rowIndex, colIndex, event)
                      }
                    ></LetterSlot>
                  </Grid>
                ))}
              </Grid>
            );
          })}
        </Grid>
        <div className='container'>
          <button className='reset-btn'>RESET</button>
        </div>
        <div> Known letters: </div>
        <div> Possible letters: </div>
        <div> Wrong letters: </div>
        <div> Possible Words: </div>
        <AddFriendForm></AddFriendForm>
      </div>
    );
  }
}

export default Kurdle;
