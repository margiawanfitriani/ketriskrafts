import LetterSlot from './LetterSlot';
import { Position } from './Position';
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
  var rows = new Array(5);
  for (let index = 0; index < rows.length; index++) {
    rows[index] = (Array(6).fill(new Position('', -1, index)))
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
    var calculatedWordList = words
    this.state.gridList.forEach(col => {
      col.forEach(position => {
        calculatedWordList = trimWords(position, calculatedWordList)
      })
    });

    this.setState({ wordList: calculatedWordList })
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
              // TODOASDF IN THE FUTURE FIX THIS TO BE A CONTAINER WITH COLOUMN DIRECTION
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
          <button className='reset-btn' onClick={() => this.setState({ ...initialState })}>RESET</button>
          <button className='reset-btn' onClick={this.filterWords.bind(this)}>Calculate</button>
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
