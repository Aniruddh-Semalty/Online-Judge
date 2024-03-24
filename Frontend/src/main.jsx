import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import routes from "./Components/App";
import { Provider } from "react-redux";
import appStore from "../utils/Store/appStore";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={routes}></RouterProvider>
  </Provider>
);
