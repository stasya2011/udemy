const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
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
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "DELETE_HERO":
      const updatedHeroes = state.heroes.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        heroes: updatedHeroes,
      };
    case "ADD_HERO":
      const newHero = [...state.heroes];
      newHero.push(action.payload);

      return {
        ...state,
        heroes: newHero,
      };
    default:
      return state;
  }
};

export default reducer;
