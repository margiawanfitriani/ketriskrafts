import { Position } from './Position';
import './Kurdle.css';

type myProps = {
  onKeyUp: any;
  position: Position;
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

//TODOASDF This doesn't work on my android phone
// function SpaceBarPressed(
//   e: React.KeyboardEvent<HTMLInputElement>,
//   props: myProps
// ) {
//   if (e.key === " " ||
//     e.code === "Space" ||
//     e.keyCode === 32
//   ) {
//     props.onKeyUp();
//   }
// }

function LetterSlot(props: myProps) {
  return (
    <input
      className='kurdle-cell'
      maxLength={1}
      // onKeyUp={e => SpaceBarPressed(e, props)}
      onClick={props.onKeyUp}
      value={props.position.Letter}
      onChange={(e) => props.onChange(e)}
      style={{
        background: colorPicker(props.position.Color),
      }}
    ></input>
  );
}

export default LetterSlot;
