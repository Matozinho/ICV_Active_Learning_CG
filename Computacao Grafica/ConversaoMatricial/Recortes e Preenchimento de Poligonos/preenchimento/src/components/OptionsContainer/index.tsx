import { useCanvasContext } from '../../hooks/useCanvasContext';
import { usePolygonContext } from '../../hooks/usePolygonContext';
import './styles.css';

export function OptionsContainer() {
  const {
    polygon,
    polygonBorderColor,
    polygonFillColor,
    setPolygonBorderColor,
    setPolygonFillColor,
  } = usePolygonContext();

  const { setClearCanvas } = useCanvasContext();

  // TODO: FIX Bug to change poligon colors
  const changeColors = () => {
    polygon.changeBorderColor(polygonBorderColor);
    polygon.changePolygonColor(polygonFillColor);
  }

  return (
    <section className="userOptions">
      <form>
        <h3>Escolha as cores para o polígono</h3>
        <div>
          <label htmlFor="borderColor"> Cor das bordas </label>
          <input
            type="color"
            id="borderColor"
            value={polygonBorderColor}
            onChange={e => setPolygonBorderColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="polygonColor">Cor de preenchimento</label>
          <input
            type="color"
            id="polygonColor"
            value={polygonFillColor}
            onChange={e => setPolygonFillColor(e.target.value)}
          />
        </div>
        <div className="buttonOptions">
          <button type="button" onClick={changeColors}>Aplicar</button>
          <button type="button" onClick={() => setClearCanvas(true)}>Limpar</button>
        </div>
      </form>
    </section>
  )
}