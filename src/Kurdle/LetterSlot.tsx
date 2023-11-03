import { Color, Position } from "./Position";
import "./Kurdle.css";

type myProps = {
  position: Position;
  onChange: any;
  inputRef: any;
};

function colorPicker(Accuracy: number): string {
  switch (Accuracy) {
    case Color.Grey:
      return "#2c3032";
    case Color.Yellow:
      return "#917f2f";
    case Color.Green:
      return "#42713e";
    default:
      return "#121212";
  }
}

function LetterSlot(props: myProps) {
  return (
    <input
      ref={props.inputRef}
      className="kurdle-cell"
      onKeyUp={(e) => props.onChange(e.key)}
      style={{
        background: colorPicker(props.position.Color),
        border: props.position.Color === Color.Nothing ? "2px solid #797063" : "0px",
      }}
    ></input>
  );
}

export default LetterSlot;
