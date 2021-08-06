import { useCanvasContext } from "../../hooks/useCanvasContext";
import FillPolygonSketch from "../../sketches/FillPolygonSketch";

import "./styles.css";

export function Canvas() {
  const { setRightButtonClicked } = useCanvasContext();
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setRightButtonClicked(true);
        return false;
      }}
      id="canvas"
    >
      <FillPolygonSketch
        canvasParentRef="canvas"
        canvasWidth={900}
        canvasHeight={500}
      />
    </div>
  );
}

