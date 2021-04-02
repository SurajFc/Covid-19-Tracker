import { GLOBALALL } from "../constants";

const initialState = {};

//Get Virus
const virusReducer = (
  state = initialState,
  { type, virusGlobal, countries }
) => {
  switch (type) {
    case GLOBALALL:
      return {
        ...state,
        global: virusGlobal,
        countries: countries,
      };

    default:
      return state;
  }
};

export default virusReducer;
