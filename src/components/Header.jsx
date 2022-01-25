import React, { useContext } from 'react';
import SWContext from '../context/SwContext';

function Header() {
  const { handleFilterByName } = useContext(SWContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      placeholder="Filtrar por Nome"
      onChange={ handleFilterByName }
    />
  );
}

export default Header;
