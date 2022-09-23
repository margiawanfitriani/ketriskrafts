import React from 'react';

function LetterSlot(props: any) {
  return (
    <div>
      <button onClick={props.onClick}>
        Value: {props.Letter.Value}
        Accuracy {props.Letter.Accuracy}
      </button>
    </div>
  );
}

export default LetterSlot;
