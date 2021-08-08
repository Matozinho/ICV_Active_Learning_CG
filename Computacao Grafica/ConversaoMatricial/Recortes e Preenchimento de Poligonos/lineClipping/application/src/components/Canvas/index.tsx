import { P5Interface } from "../../sketches/P5Interface"

import './styles.css';

export const Canvas = () => {
  return (
    <div id="canvas">
      <P5Interface
        canvasParentRef="canvas"
        canvasWidth={900}
        canvasHeight={500}
      />
    </div>
  );
}