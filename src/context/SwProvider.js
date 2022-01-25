import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SwContext from './SwContext';
import getStarWarsPlanets from '../services/SWapi';

function SwProvider({ children }) {
  const initialFilters = {
    filterByName: {
      name: '',
    },
  };

  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const getPlanets = async () => {
    const response = await getStarWarsPlanets();
    setPlanets(response.results);
  };

  // ComponentDidMount
  useEffect(() => {
    getPlanets();
  }, []);

  // Filtro por Nome
  const filterPlanetsByName = (name) => {
    if (planets && name !== '') {
      const filterResult = planets.filter((item) => item.name.includes(name));
      setPlanets(filterResult);
    } else {
      getPlanets();
    }
  };

  const handleFilterByName = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: { name: target.value },
    });
    filterPlanetsByName(target.value);
  };

  const contextValues = {
    planets,
    handleFilterByName,
  };

  return (
    <SwContext.Provider
      value={ contextValues }
    >
      { children }
    </SwContext.Provider>
  );
}

SwProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SwProvider;
