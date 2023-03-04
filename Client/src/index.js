import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { PostDetail } from "./pages/PostDetail";
import { Setting } from "./pages/setting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/postdetail/:id",
        element: <PostDetail />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
    errorElement: <div>error!!</div>,
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
