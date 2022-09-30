import LetterSlot from './LetterSlot';
import React, { Children } from 'react';
import { Letter } from './Letter';
import { deepCopy } from '../Utilities/deepCopy';
import Grid from '@mui/material/Grid'; // Grid version 1
import './Kurdle.css';
import { words } from './WordProcessor';

type Props = {
  title: string;
  children?: React.ReactNode;
};

type MyState = {
  wordsList: Letter[][];
  green: Letter[];
  yellow: Letter[];
  grey: Letter[];
};

let possibleWords = words;

class Kurdle extends React.Component<any, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      wordsList: new Array(5).fill(Array(6).fill(new Letter('', -1))),
      green: new Array(5),
      yellow: new Array(),
      grey: new Array(26),
    };
  }

  interpretLettersArray() {
    this.state.wordsList.forEach(word => {
      word.forEach((letter: Letter) => {
        //-1 is no entry, 0 is grey, 1 is yellow, 2 is green
        switch (letter.Accuracy) {
          case 0:
            this.state.grey.push(letter);
            break;
          case 1:
            this.state.yellow.push(letter);
            break;
          case 0:
            this.state.green.push(letter);
            break;
        }
      });
    });
  }

  updateLetterAccuracy(row: number, col: number) {
    let copiedLetters: Letter[][] = deepCopy(this.state.wordsList);
    if (++copiedLetters[row][col].Accuracy === 3) {
      copiedLetters[row][col].Accuracy = -1;
    }

    this.setState({ wordsList: deepCopy(copiedLetters) });
    this.interpretLettersArray();
  }

  updateLetterValue(
    row: number,
    col: number,
    event: React.FormEvent<HTMLInputElement>,
  ) {
    let copiedLetters: Letter[][] = deepCopy(this.state.wordsList);

    copiedLetters[row][col].Letter = event.currentTarget.value;
    this.setState({
      wordsList: deepCopy(copiedLetters),
    });
    this.interpretLettersArray()
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
          {this.state.wordsList.map((row, rowIndex) => {
            return (
              <Grid key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Grid item>
                    <LetterSlot
                      letter={this.state.wordsList[rowIndex][colIndex]}
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
        {/* <div> green letters: {this.state.wordsList[0][0]} </div> */}
        {/* <div> Possible letters: {yellow} </div>
        <div> Wrong letters: {grey} </div> */}
        <div> Possible Words: {possibleWords} </div>
      </div>
    );
  }
}

export default Kurdle;
