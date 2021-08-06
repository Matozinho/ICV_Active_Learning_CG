import { LineClipping } from "../../sketches/LineClipping"

import './styles.css';

export const Canvas = () => {
  return (
    <div id="canvas">
      <LineClipping
        canvasParentRef="canvas"
        canvasWidth={900}
        canvasHeight={500}
      />
    </div>
  );
}