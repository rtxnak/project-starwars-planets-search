import React, { useContext } from 'react';
import SWContext from '../context/SwContext';

function Header() {
  const {
    handleFilterByName,
    filterByNumericValues,
    numericFilters,
    options,
    inputHandleChange,
    filterApply,
  } = useContext(SWContext);

  // console.log(options);

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Escreva o nome"
          onChange={ handleFilterByName }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ inputHandleChange }
        >
          {
            options.map((option) => (
              <option
                value={ option }
                key={ option }
              >
                { option }
              </option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ inputHandleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ numericFilters.value }
          onChange={ inputHandleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterApply }
        >
          Filtrar
        </button>
        <div>
          {
            filterByNumericValues.map(({ column, comparison, value }, i) => (
              <div key={ i } data-testid="filter">
                { `${column} ${comparison} ${value}` }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
