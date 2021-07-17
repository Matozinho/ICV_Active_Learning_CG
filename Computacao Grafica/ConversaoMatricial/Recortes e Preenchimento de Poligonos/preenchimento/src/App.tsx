import './styles/home.css';

import { OptionsContainer } from './components/OptionsContainer';
import { Canvas } from './components/Canvas';

import { PolygonContextProvider } from './contexts/PolygonContextProvider';
import { CanvasContextProvider } from './contexts/CanvasContextProvider';
import { GithubCorner } from './components/GithubCorner';

function App() {
  return (
    <div className="HomeContainer">
      <h1>Preenchimento de Polígonos</h1>
      <main className="main">
        <CanvasContextProvider>
          <PolygonContextProvider>
            <GithubCorner />
            <OptionsContainer />
            <Canvas />
          </PolygonContextProvider>
        </CanvasContextProvider>
      </main>
    </div>
  );
}

export default App;
