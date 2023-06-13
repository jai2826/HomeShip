import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./../store/store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Signin from "./pages/Authentication/Signin.jsx";
import Signup from "./pages/Authentication/Signup.jsx";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import ProductPage from "./pages/product";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Settings/Profile.jsx";
import Addresses from "./pages/Settings/Addresses.jsx";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          {
            path: "/settings/profile",
            element: <Profile />,
          },
          {
            path: "/settings/addresses",
            element: <Addresses />,
          },
        ],
      },
      {
        path: "/product/:slug",
        element: <ProductPage />,
      },
      {
        path: "/auth/signin",
        element: <Signin />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
]);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={Router} />
    </PersistGate>
  </Provider>
);
