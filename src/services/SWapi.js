const SW_BASE_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getStarWarsPlanets = async () => {
  const response = await fetch(SW_BASE_API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getStarWarsPlanets;
