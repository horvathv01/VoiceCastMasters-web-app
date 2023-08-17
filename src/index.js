import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/layout-structure.css';

import Root from "./routes/root.js";
import Tester from "./routes/test.js";
import Home from "./routes/home.js";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "asd", // BUG | For some reason, it renders the parent element
        element: <Root />
      }
    ]
  },
  {
    path: "test",
    element: <Tester />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
