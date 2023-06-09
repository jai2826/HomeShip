import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/Cart/cart";
import userReducer from "../feature/Auth/user";
import loadingReducer from "../feature/Page/loading";
import hideNavbarReducer from "../feature/Page/hideNavbar";
import cartLoaderReducer from '../feature/Cart/loading'
import { reducer as notificationsReducer } from "reapop";
import productsReducer from "../feature/Product/products";
import productsLoaderReducer from '../feature/Product/loading'
import filterReducer from '../feature/Product/filter'
import FavouriteReducer from "../feature/Auth/favourite";
import UtilReducer from '../feature/Page/utils'
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
import AddressesReducer from "../feature/Auth/Addresses";


const persistConfig = {
  key: "root",
  storage,
  blacklist: ['loading','productsLoading','cartLoader','filters','products','favourite'],
};

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  cart: cartReducer,
  cartLoader: cartLoaderReducer,
  auth: userReducer,
  loading: loadingReducer,
  hideNavbar: hideNavbarReducer,
  products: productsReducer,
  productsLoading: productsLoaderReducer,
  filters:filterReducer,
  util:UtilReducer,
  favourite:FavouriteReducer,
  addresses:AddressesReducer,
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
