const INITIAL_STATE = {
  transfers: [],
};

export function transferReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_TRANSFERS":
      return {
        ...state,
        transfers: action.transfers,
      };
    case "ADD_TRANSFER":
      if (state.transfers) {
        return {
          ...state,
          transfers: [...state.transfers, action.transfer],
        };
      }
      return {
        ...state,
        transfers: [action.transfer],
      };
    case "CLEAR_TRANSFERS":
      return {
        transfers: null,
      };
    default:
      return state;
  }
}
