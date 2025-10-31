// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar can go here */}
      <main className="flex-grow">
        <Outlet /> {/* ✅ this renders Login or SignUp */}
      </main>
      {/* Footer can go here */}
    </div>
  );
};

export default AppLayout;
