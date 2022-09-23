import React from 'react';

function LetterSlot(props: any) {
  return (
    <button onClick={props.onClick}>
      Letter: {props.letter.Letter}
      Accuracy: {props.letter.Accuracy}
    </button>
  );
}

export default LetterSlot;
