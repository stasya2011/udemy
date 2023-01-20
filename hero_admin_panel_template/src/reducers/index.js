const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeFilter: "all",
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        filteredHeroes:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (hero) => hero.element === state.activeFilter
              ),
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
      };
    case "DELETE_HERO":
      const updatedHeroes = state.heroes.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        heroes: updatedHeroes,
        filteredHeroes:
          state.activeFilter === "all"
            ? updatedHeroes
            : updatedHeroes.filter(
                (hero) => hero.element === state.activeFilter
              ),
      };
    case "ADD_HERO":
      const newHero = [...state.heroes];
      newHero.push(action.payload);

      return {
        ...state,
        heroes: newHero,
        filteredHeroes:
          state.activeFilter === "all"
            ? newHero
            : newHero.filter((hero) => hero.element === state.activeFilter),
      };
    case "SET_FILTER":
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((hero) => hero.element === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
