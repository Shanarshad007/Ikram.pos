import Item from "antd/es/list/Item"; // Import statement (assuming this is required here)

const initialState = {
  loading: false,
  cartitems: []
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addTocart':
      return {
        ...state,
        cartitems: [...state.cartitems, action.payload]
      };
      case 'DeleteFromCart':
      return {
        ...state,
        cartitems: state.cartitems.filter((item)=>item._id !== action.payload._id)
      };
    case 'updateCart':
      return {
        ...state,
        cartitems: state.cartitems.map(item =>
          item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
        )
      };
      case 'showLoading':
      return {
        ...state,
        loading : true
      };
      case 'hideLoading':
      return {
        ...state,
        loading : false
      };
    default:
      return state;
  }
};
