const INIT_STATE = {
  carts: [],
};

// reducer fns
export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };

    case "REMOVE_FROM_CART":
      const data = state.carts.filter((item) => item.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    default:
      return state;
  }
};
