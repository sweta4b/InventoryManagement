const initialState = {
  items: [],
  sales: []
};

const InventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return {
        ...state,
        items: action.payload
      };
    case "ADD_ITEMS":
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case "REMOVE_ITEMS":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload._id)
      };
    case "UPDATE_ITEMS":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        )
      };
    case "FETCH_SALES":
      return {
        ...state,
        sales: action.payload
      };
    case "ADD_SALES":
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case "REMOVE_SALES":
      return {
        ...state,
        sales: state.sales.filter((sale) => sale._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export default InventoryReducer;
