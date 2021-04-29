import { useState } from 'react';
import styles from './Styles.module.css';

export function OptionsContainer() {
  const [polygonBorderColor, setPolygonBorderColor] = useState("#000000");
  const [polygonFillColor, setPolygonFillColor] = useState("#000000");

  const handleFormsData = event => {
    event.preventDefault();
    console.log("border Color: " + polygonBorderColor + " Fill Color: " + polygonFillColor);
  }

  return (
    <section className={styles.userOptions}>
      <form onSubmit={handleFormsData}>
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
        <button type="submit">Aplicar</button>
      </form>
    </section>
  )
}