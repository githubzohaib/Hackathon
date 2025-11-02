// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout"; 
import Login from "./components/layouts/Login";          
import SignUp from "./components/layouts/SignUp";        
import Dashboard from "./components/layouts/Dashboard"; // Add Dashboard import
import Pricing from "./components/layouts/Pricing"; // Add Pricing import
import Markettrend from "./components/layouts/Markettrend"; // Add Markettrend import
import Weather from "./components/layouts/Weather";
import FarmerDashboard from "./components/layouts/FarmerDashboard";
import AdminDashboard from "./components/layouts/AdminDashboard";
import ComplaintDashboard from "./components/layouts/ComplaintDashboard";
import Chatbot from "./components/layouts/Chatbot";
import ExpertDashboard from "./components/layouts/ExpertDashboard";
import BuyerDashboard from "./components/layouts/BuyerDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, 
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
      {
        path: "pricing",  // New route
        element: <Pricing />,
      },

      {
        path: "markettrend",  // New route
        element: <Markettrend />,
      },

      {
        path: "weather",  // New route
        element: <Weather />,
      },

      {
        path: "farmerdashboard",  // New route
        element: <FarmerDashboard/>,
      },

      {
        path: "admindashboard",  // New route
        element: <AdminDashboard />,
      },

      {
        path: "complaintdashboard",  // New route
        element: <ComplaintDashboard />,
      },

      {
        path: "chatbot",  // New route
        element: <Chatbot />,
      },
      {
        path: "buyerdashboard",  // New route
        element: <BuyerDashboard />,
      },
      {
        path: "expertdashboard",  // New route
        element: <ExpertDashboard />,
      },
    ],
  },
]);

export default router;
