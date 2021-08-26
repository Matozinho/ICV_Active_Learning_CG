import "./styles.css";

export const OptionsContainer = () => {
  return (
    <section className="optionsContainer">
      <header>
        <label htmlFor="executionTime">
          Tempo de Execução <br /> [s]:[ms]
        </label>
        <div id="executionTime"></div>

        <div id="optionsDropDown" />

        <h4>Gerar Linhas Aleatórias</h4>
        <label htmlFor="randomLines">Número de Linhas</label>
        <div id="randomLines" />
      </header>

      <footer id="controlButtons">
        <div id="clippingButton" />
        <div id="clearButton" />
      </footer>
    </section>
  );
};

