export const ADD = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const DELETE = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: id,
  };
};

export const DECREASE_QUANTITY = (item) => {
  return {
    type: "REMOVE_ONE_FROM_CART",
    payload: item,
  };
};
