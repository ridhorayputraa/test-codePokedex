// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import { ThemeProvider } from "@emotion/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import TypePages from "./pages/TypePages";
import { store } from "./store/store";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokemon",
    element: <Favorite />,
  },
  {
    path: "/pokemon/:name",
    element: <Detail />,
  },
  {
    path: "/:type",
    element: <TypePages/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>
);
