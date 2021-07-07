import FillPolygonSketch from '../../sketches/FillPolygonSketch';

import './styles.css';

export function Canvas() {
  return (
    <div id="canvas">
      <FillPolygonSketch
        canvasParentRef="canvas"
        canvasWidth={900}
        canvasHeight={500}
      />
    </div>
  )
}