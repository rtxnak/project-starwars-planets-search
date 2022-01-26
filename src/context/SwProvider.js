import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SwContext from './SwContext';
import getStarWarsPlanets from '../services/SWapi';

function SwProvider({ children }) {
  const initialFilters = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const allColumnOptions = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [options, setOptions] = useState(allColumnOptions);

  const initialInput = {
    column: options[0],
    comparison: 'maior que',
    value: '0',
  };

  const [numericFilters, setNumericFilters] = useState(initialInput);
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

  // Filtro por valores numericos
  const filterPlanetsByValues = (filterValues, planetsArr) => {
    if (filterValues.length !== 0) {
      filterValues.forEach((filter) => {
        const filterResult = planetsArr.filter((planet) => {
          const columnValue = Number(planet[filter.column]);
          const filterValue = Number(filter.value);
          if (filter.comparison === 'maior que') {
            return columnValue > filterValue;
          }
          if (filter.comparison === 'menor que') {
            return columnValue < filterValue;
          }
          return columnValue === filterValue;
        });
        setPlanets(filterResult);
      });
    }
  };

  const handleFilterByValues = (values) => {
    const newFilterValues = filters.filterByNumericValues.concat(values);
    setFilters({
      ...filters,
      filterByNumericValues: newFilterValues,
    });
    // console.log(newFilterValues);
    filterPlanetsByValues(newFilterValues, planets);
  };

  const inputHandleChange = ({ target }) => {
    setNumericFilters({
      ...numericFilters,
      [target.name]: target.value,
    });
    // console.log(numericFilters);
  };

  const filterApply = () => {
    handleFilterByValues(numericFilters);
    const newOptions = [...options];
    newOptions.splice(options.indexOf(numericFilters.column), 1);
    setOptions(newOptions);
    // console.log(options);
  };

  const contextValues = {
    planets,
    handleFilterByName,
    filterByNumericValues: filters.filterByNumericValues,
    numericFilters,
    options,
    inputHandleChange,
    filterApply,
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
