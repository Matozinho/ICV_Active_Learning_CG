import { useState } from 'react';
import './styles.css';

export function OptionsContainer() {
  const [polygonBorderColor, setPolygonBorderColor] = useState("#000000");
  const [polygonFillColor, setPolygonFillColor] = useState("#000000");

  const changeColors = (event: any) => {
    event.preventDefault();
    console.log("border Color: " + polygonBorderColor + " Fill Color: " + polygonFillColor);
  }

  return (
    <section className="userOptions">
      <form onSubmit={changeColors}>
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
        {/* TODO: 
          Criar botão de limpar opções
          Criar contexto para mudar as cores */}
        <button type="submit">Aplicar</button>
      </form>
    </section>
  )
}