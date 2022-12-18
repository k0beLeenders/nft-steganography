import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import solanaReducer from "./solana/solana.slice";
import uiReducer from "./ui/reducer";

export const store = configureStore({
  reducer: {
    solana: solanaReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
