import { ACTION_TYPES } from "../constants/types";
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.TEST:
      return { ...state, count: state.count + action?.payload };
    default:
      return state;
  }
};
