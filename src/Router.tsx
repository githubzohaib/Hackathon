// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Login from "./components/layouts/Login";
import SignUp from "./components/layouts/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, // default route → /login
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
