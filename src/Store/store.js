import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/mainReducer"; // We'll create this file later

const store = configureStore({ reducer: rootReducer });

export default store;
