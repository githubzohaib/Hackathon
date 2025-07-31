import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import eaklLogo from "../images/EAKL Logo.jpeg";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", path: "home" },
  { name: "About Us", path: "about-us" },
  { name: "Services", path: "services" },
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getFirstName = () => {
    if (!currentUser?.displayName) return "User";
    return currentUser.displayName.split(" ")[0];
  };

  return (
    <nav className="sticky top-0 w-full bg-white z-50 shadow-sm px-4 md:px-10 py-4 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <img src={eaklLogo} alt="EAKL Logo" className="w-8 h-8 rounded-sm" />
        <h1 className="text-base font-bold">NextBook</h1>
      </div>

      {/* Center Links */}
      {isLanding && (
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-redcustom text-sm font-medium cursor-pointer transition-colors duration-150"
              smooth={true}
              duration={500}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* Right Side */}
      {currentUser ? (
        <div className="flex items-center gap-3">
          <p className="hidden sm:block text-sm font-medium text-gray-700">
            Welcome, <span className="text-blue-600">{getFirstName()}</span>
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <img
                  src={currentUser.photoURL || "https://i.pravatar.cc/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-gray-500"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 w-48 bg-white shadow-lg rounded-md p-1"
            >
              <DropdownMenuItem
                onClick={() => navigate("/recently-requested")}
                className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100"
              >
                Recently Requested
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/favourites")}
                className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100"
              >
                Favourites
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer px-3 py-2 rounded hover:bg-red-100"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : isLanding ? (
        <div className="flex gap-3">
          <Button
            size="sm"
            className="relative transition-colors duration-200"
            onClick={() => navigate("/sign-in")}
          >
            <span className="relative z-10">LOGIN</span>
            <span className="absolute inset-0 border-2 border-transparent rounded-md" />
          </Button>
       
          
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;