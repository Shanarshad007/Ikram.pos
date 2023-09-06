import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { createRoot } from "react-dom/client";


const finalReducer = combineReducers({
  rootReducer: rootReducer,
});

const initialState = {
  rootReducer: {
    cartitems: localStorage.getItem("cartitems")
      ? JSON.parse(localStorage.getItem("cartitems"))
      : [],
  },
};

const store = createStore(finalReducer, initialState);

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
