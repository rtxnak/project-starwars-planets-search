import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SwContext from './SwContext';
import getStarWarsPlanets from '../services/SWapi';

function SwProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const response = await getStarWarsPlanets();
      setPlanets(response);
    };
    getPlanets();
  }, []);

  const contextValues = {
    planets,
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
