// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout"; 
import Login from "./components/layouts/Login";          
import SignUp from "./components/layouts/SignUp";        
import Dashboard from "./components/layouts/Dashboard"; // Add Dashboard import

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, // Default route → Login
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
      {
        path: "dashboard",  // New route
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
