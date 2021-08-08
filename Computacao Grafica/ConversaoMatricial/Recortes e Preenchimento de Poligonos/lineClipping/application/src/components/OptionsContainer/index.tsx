import './styles.css';;

export const OptionsContainer = () => {
  return (
    <section className="optionsContainer">
      <header>
        <label htmlFor="executionTime">Tempo de Execução</label>
        <div id="executionTime"></div>

        <div id="optionsDropDown" />
      </header>

      <footer id="controlButtons" />
    </section >
  )
}