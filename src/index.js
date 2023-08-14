import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
