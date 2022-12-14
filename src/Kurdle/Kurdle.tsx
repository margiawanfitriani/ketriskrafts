import LetterSlot from './LetterSlot';
import { Color, Position } from './Position';
import { deepCopy } from '../Utilities/deepCopy';
import Grid from '@mui/material/Grid';
import './Kurdle.css';
import { trimWords, words } from './WordProcessor';
import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type MyState = {
  gridList: Position[][];
  wordList: string[];
  anchorEl: HTMLButtonElement | null;
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
  anchorEl: null
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
            // If we have a grey letter that is the same as a green then don't filter out words that only have one of that letter.
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

  updatePositionInfo(
    row: number,
    col: number,
    event: React.FormEvent<HTMLInputElement>,
  ) {
    let copiedGridOfLetters: Position[][] = deepCopy(this.state.gridList);

    let finalItemInCell: string = event.currentTarget.value.at(-1) || '';

    let changingColor = finalItemInCell === ' ';
    if (changingColor) {
      if (++copiedGridOfLetters[row][col].Color > Color.Green) {
        copiedGridOfLetters[row][col].Color = Color.Grey;
      }
    } else {
      copiedGridOfLetters[row][col].Letter = finalItemInCell.toUpperCase();

      let setTheInitialColorWhenWeAddALetter = copiedGridOfLetters[row][col].Color === Color.Nothing;
      if (setTheInitialColorWhenWeAddALetter) {
        copiedGridOfLetters[row][col].Color = Color.Grey;
      }
    }

    let noTextEntered = event.currentTarget.value.trim().length === 0;
    if (noTextEntered) {
      copiedGridOfLetters[row][col].Color = Color.Nothing;
    }

    this.setState({ gridList: deepCopy(copiedGridOfLetters) }, this.filterWords);
  }

  render() {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const open = Boolean(this.state.anchorEl);
    const helpButton = open ? 'simple-popover' : undefined;

    return (
      <div>
        <div className='container'>
          <Popover id={helpButton} open={open} anchorEl={this.state.anchorEl} onClose={handleClose}
            anchorOrigin={
              {
                vertical: 'bottom',
                horizontal: 'left',
              }}
          >
            <Typography sx={
              {
                p: 2,
                fontSize: '5vw'
              }}>
              To change the color of an item press space bar. Press enter or return to go to the next box.
            </Typography>
          </Popover>
          <button
            onClick={handleClick}
            className='question-icon'>
            <HelpOutlineIcon sx={{ 'fontSize': '10vw' }} />
          </button>
          <button className='reset-btn' onClick={() => this.setState({ ...initialState })}>Reset</button>
        </div>
        <div className="div-grid-holder">
          <div>
            {this.state.gridList.map((row, rowIndex) => {
              return (
                <Grid container key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <Grid item key={colIndex}>
                      <LetterSlot
                        position={this.state.gridList[rowIndex][colIndex]}
                        onChange={(event: React.FormEvent<HTMLInputElement>) =>
                          this.updatePositionInfo(rowIndex, colIndex, event)
                        }
                      ></LetterSlot>
                    </Grid>
                  ))}
                </Grid>
              );
            })}
          </div>
          <div className='wordListDiv'>
            <p>{this.state.wordList.join(' ')}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Kurdle;
