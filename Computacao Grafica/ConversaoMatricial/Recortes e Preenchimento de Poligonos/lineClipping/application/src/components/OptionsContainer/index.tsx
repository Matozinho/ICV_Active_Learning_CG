import { useState } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


import './styles.css';

export const OptionsContainer = () => {
  const [algorithm, setAlgorithm] = useState('cohenSutherland');

  const handleChangeAlgoeithm = (e: React.ChangeEvent<{ value: unknown }>) => {
    setAlgorithm(e.target.value as string)
    console.log(e.target.value);
  }


  return (
    <section className="optionsContainer">
      <header>
        <label htmlFor="executionTime">Tempo de Execução</label>
        <div id="executionTime"></div>

        <Select
          className="optionsDropDown"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={algorithm}
          onChange={(e) => handleChangeAlgoeithm(e)}
        >
          <MenuItem value={'cohenSutherland'}>Cohen-Sutherland</MenuItem>
          <MenuItem value={'liangBarsky'}>Liang &amp; Barsky</MenuItem>
        </Select>

      </header>

      <footer>
        <button onClick={() => console.log(algorithm)}>Recortar</button>
        <button>Limpar</button>
      </footer>
    </section>
  )
}