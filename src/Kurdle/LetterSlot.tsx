import { TextField } from '@mui/material';
import React from 'react';
import { Letter } from './Letter';

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
    <textarea
      maxLength={1}
      onClick={props.onClick}
      value={props.letter.Letter}
      onChange={(e) => props.onChange(e)}
      style={{
        background: colorPicker(props.letter.Accuracy),
        color: 'White',
        width: '120px',
        height: '120px',
        fontFamily: 'Fantasy',
        fontSize: '80px',
        border: '2px solid #3a3a3c',
        borderRadius: '10%',
        margin: '12px 6px',
        textDecoration: 'none',
        resize: 'none',
        whiteSpace: 'normal',
        textAlign: 'center',
        verticalAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    ></textarea>
  );
}

export default LetterSlot;
