import { TextField } from '@mui/material';
import React, { KeyboardEventHandler } from 'react';
import { Letter } from './Letter';
import './Kurdle.css';

type myProps = {
  onClick: any;
  letter: Letter;
  onChange: any;
};

function colorPicker(Accuracy: number): string {
  switch (Accuracy) {
    case 0:
      return '#3a3a3c';
    case 1:
      return '#b59f3b';
    case 2:
      return '#538d4e';
    default:
      return '#121213';
  }
}

function LetterSlot(props: myProps) {
  return (
    <input
      className='kurdle-cell'
      maxLength={1}
      onClick={props.onClick}
      value={props.letter.Letter}
      onChange={(e) => props.onChange(e)}
      style={{
        background: colorPicker(props.letter.Accuracy),
      }}
    ></input>
  );
}

export default LetterSlot;
