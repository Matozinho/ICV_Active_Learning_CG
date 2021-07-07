import './styles/home.css';

import { OptionsContainer } from './components/OptionsContainer';
import { Canvas } from './components/Canvas';

function App() {
  return (
    <div className="HomeContainer">
      <h1>Preenchimento de Polígonos</h1>
      <main className="main">
        <OptionsContainer />
        <Canvas />
      </main>
    </div>
  );
}

export default App;
