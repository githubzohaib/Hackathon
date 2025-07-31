import { createBrowserRouter, Navigate } from "react-router-dom";
import Applayout from "./components/layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import SearchResult from "./pages/SearchResult";
import BookDetail from "./pages/BookDetail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NoMatch from "./pages/NoMatch";
import { useAuth } from "./contexts/AuthContext"; // Make sure this path is correct
import Error500 from "./pages/Error500";

// Root component that handles redirection logic
const RootRedirect = () => {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }
  
  return <Applayout />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>,
  },
  {
    path: "/search-results",
    element: <ProtectedRoute>
      <SearchResult />
    </ProtectedRoute>,
  },
  {
    path: "/book/:bookId",
    element: <ProtectedRoute>
      <BookDetail />
    </ProtectedRoute>,
  },
  {
    path: "/faculty-dashboard",
    element: <ProtectedRoute allowedRoles={['faculty']}>
      <FacultyDashboard />
    </ProtectedRoute>,
  },
  {
    path: "/student-dashboard",
    element: <ProtectedRoute allowedRoles={['student']}>
      <StudentDashboard />
    </ProtectedRoute>,
  },
  {
    path: "/error", // ✅ NEW
    element: <Error500 />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
], {
  basename: global.basename
});