const initialState = {
  pageDetails: {},
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.pageDetails, action.payload],
      };
    default:
      return state;
  }
};

export default pageReducer;
