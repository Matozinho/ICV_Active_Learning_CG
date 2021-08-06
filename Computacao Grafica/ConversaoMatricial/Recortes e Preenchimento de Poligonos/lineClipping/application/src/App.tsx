import { Canvas } from "./components/Canvas";
import { GithubCorner } from "./components/GithubCorner";
import { OptionsContainer } from "./components/OptionsContainer";

import './styles/home.css';

export default function App() {
  return (
    <div className="homeContainer">
      <h1>Recorte de Linhas</h1>
      <GithubCorner />
      <main>
        <OptionsContainer />
        <Canvas />
      </main>
    </div>
  );
}