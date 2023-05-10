import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/Cart/cart";
import userReducer from "../feature/Auth/user";
import loadingReducer from "../feature/Page/loading";
import hideNavbarReducer from "../feature/Page/hideNavbar";
import { reducer as notificationsReducer } from "reapop";
import productsReducer from "../feature/Product/products";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['loading'],
};

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  cart: cartReducer,
  auth: userReducer,
  loading: loadingReducer,
  hideNavbar: hideNavbarReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
