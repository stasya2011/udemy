export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroDelete = (id) => {
  return {
    type: "DELETE_HERO",
    payload: id,
  };
};

export const heroAdd = (hero) => {
  return {
    type: "ADD_HERO",
    payload: hero,
  };
};

export const fetchFilter = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const setFilter = (newFilter) => {
  return {
    type: "SET_FILTER",
    payload: newFilter,
  };
};
