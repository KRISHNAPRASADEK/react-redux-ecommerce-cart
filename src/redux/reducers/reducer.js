const INIT_STATE = {
  carts: [],
};

// reducer fns
export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, temp],
        };
      }

    case "REMOVE_FROM_CART":
      const data = state.carts.filter((item) => item.id !== action.payload);
      return {
        ...state,
        carts: data,
      };

    case "REMOVE_ONE_FROM_CART":
      const itemIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.carts[itemIndex_dec].qnty >= 1) {
        const deleteItem = (state.carts[itemIndex_dec].qnty -= 1);

        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[itemIndex_dec].qnty === 1) {
        const data = state.carts.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};
