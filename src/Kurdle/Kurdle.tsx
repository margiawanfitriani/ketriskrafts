import LetterSlot from './LetterSlot';
import { Color, Position } from './Position';
import { deepCopy } from '../Utilities/deepCopy';
import Grid from '@mui/material/Grid'; // Grid version 1
import './Kurdle.css';
import { trimWords, words } from './WordProcessor';
import React from 'react';

type MyState = {
  gridList: Position[][];
  wordList: string[];
};

function createStartingGrid(): Position[][] {
  let rows: Position[][] = new Array(6);
  for (let index = 0; index < rows.length; index++) {
    let columnPosition: number = 0;
    rows[index] = Array(5).fill(new Position('', -1, 0)).map((el: Position) => ({ ...el, Index: columnPosition++ }));
  }
  return rows;
}

const initialState: MyState = {
  gridList: createStartingGrid(),
  wordList: [],
}

class Kurdle extends React.Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  filterWords() {
    let calculatedWordList = words
    let greenLetters: Position[] = [];

    this.state.gridList.forEach(row => {
      row.forEach(letter => {
        let overlappingLetters = greenLetters.filter((greenLetter) => greenLetter.Letter === letter.Letter)
        if (overlappingLetters.length > 0) {
          if (letter.Color !== Color.Grey) {
            // If we have a grey letter that is the same as a green then don't filter
            //TODOASDF: if we have a yellow, and a green, then we need to only find words where there are both the green and another occurance of the same
            // letter in the word right now the way I have it written would mean making some changes to how the processing gets done. I am just a little too 
            // lazy right now to fix that 
            calculatedWordList = trimWords(letter, calculatedWordList)
          }
        } else {
          calculatedWordList = trimWords(letter, calculatedWordList)
        }

        if (letter.Color === Color.Green) {
          greenLetters = greenLetters.concat(letter)
        }
      })
    });

    this.setState({ wordList: calculatedWordList })
  }

  updateLetterAccuracy(row: number, col: number) {
    let copiedLetters: Position[][] = deepCopy(this.state.gridList);
    if (++copiedLetters[row][col].Color === 3) {
      copiedLetters[row][col].Color = -1;
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
      <div className="div-grid-holder">
        <div>
          {this.state.gridList.map((row, rowIndex) => {
            return (
              <Grid container key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Grid item key={colIndex}>
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
        </div>
        <div className='container'>
          <button className='action-btn' onClick={() => this.setState({ ...initialState })}>Reset</button>
          <button className='action-btn' onClick={this.filterWords.bind(this)}>Calculate</button>
        </div>
        <div className='wordListDiv'>
          <h1 className='wordListHeader'>Possible Words</h1>
          <p>{this.state.wordList.join(' ')}</p>
        </div>
      </div>
    );
  }
}

export default Kurdle;
