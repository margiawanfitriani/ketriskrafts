import LetterSlot from './LetterSlot';
import React, { Children } from 'react';
import { Position } from './Position';
import { deepCopy } from '../Utilities/deepCopy';
import Grid from '@mui/material/Grid'; // Grid version 1
import './Kurdle.css';
import { words } from './WordProcessor';

type Props = {
  title: string;
  children?: React.ReactNode;
};

type MyState = {
  gridList: Position[][];
  wordList: string[];
};

class Kurdle extends React.Component<any, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gridList: this.createStartingGrid(),
      wordList: words,
    };
  }

  createStartingGrid(): Position[][] {
    var rows = new Array(5);
    for (let index = 0; index < rows.length; index++) {
      rows[index] = (Array(6).fill(new Position('', -1, index)))
    }
    return rows;
  }

  filterWords() {
    // let green: Position[] = new Array(5);
    // let yellow: Position[] = new Array();
    // let grey: Position[] = new Array(26);

    // let indexInWord = 0;
    // this.state.gridList.forEach(word => {
    //   word.forEach((letter: Letter) => {
    //     if (letter.Letter !== '') {
    //       switch (letter.Accuracy) {
    //         case 0:
    //           grey.push(new Position(letter, indexInWord));
    //           break;
    //         case 1:
    //           yellow.push(new Position(letter, indexInWord));
    //           break;
    //         case 2:
    //           green.push(new Position(letter, indexInWord));
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   });
    //   indexInWord++;
    // });

    // this.setState({
    //   green: green,
    //   yellow: yellow,
    //   grey: grey,
    // });
  }

  updateLetterAccuracy(row: number, col: number) {
    let copiedLetters: Position[][] = deepCopy(this.state.gridList);
    if (++copiedLetters[row][col].Accuracy === 3) {
      copiedLetters[row][col].Accuracy = -1;
    }

    this.setState({ gridList: deepCopy(copiedLetters) });
  }

  updateLetterValue(
    row: number,
    col: number,
    event: React.FormEvent<HTMLInputElement>,
  ) {
    let copiedLetters: Position[][] = deepCopy(this.state.gridList);

    copiedLetters[row][col].Letter = event.currentTarget.value;
    this.setState({
      gridList: deepCopy(copiedLetters),
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
          {this.state.gridList.map((row, rowIndex) => {
            return (
              <Grid key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Grid item>
                    <LetterSlot
                      position={this.state.gridList[rowIndex][colIndex]}
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
          <button className='reset-btn' onClick={this.filterWords}>Calculate</button>
        </div>
        {/* <div> {`Possible Words: ${this.state.wordList}`}</div> */}
      </div>
    );
  }
}

export default Kurdle;
