import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import InventoryReducer from "./src/Reducer/InventoryReducer";

const store = createStore(InventoryReducer, applyMiddleware(thunk));

export default store;
