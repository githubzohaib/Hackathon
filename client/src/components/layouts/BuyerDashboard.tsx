import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Cloud,
  TrendingUp,
  MessageCircle,
  Package,
  LogOut,
  Leaf,
  Droplets,
  Sun,
} from "lucide-react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "leaf" | "droplet" | "seed";
};

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      type: ["leaf", "droplet", "seed"][Math.floor(Math.random() * 3)] as
        | "leaf"
        | "droplet"
        | "seed",
    }));
    setParticles(newParticles);
  }, []);

  const dashboardCards = [
    {
      id: 1,
      title: "Weather Forecast",
      icon: Cloud,
      gradient: "from-blue-500 to-cyan-500",
      description: "7-day weather predictions",
      path: "/weather",
    },
    {
      id: 2,
      title: "Market Trends",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-600",
      description: "Market trends",
      stats: "15 Active Markets",
      path: "/markettrend",
    },
    {
      id: 3,
      title: "Chat with Farmer",
      icon: MessageCircle,
      gradient: "from-purple-500 to-pink-600",
      description: "Direct farmer communication",
      badge: "3 New",
      path: "/farmerchat",
    },
    {
      id: 4,
      title: "Pricing Of Products",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-600",
      description: "Crop prices",
      stats: "15 Active Markets",
      path: "/pricing",
    },
    {
      id: 5,
      title: "Purchase Products",
      icon: Package,
      gradient: "from-amber-500 to-orange-600",
      description: "Buy fresh agricultural products",
      path: "/buyer/purchase",
    },
  ];

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('rememberedUser');
    // Navigate to login page
    navigate('/login');
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const ParticleIcon = ({ type }: { type: "leaf" | "droplet" | "seed" }) => {
    if (type === "leaf")
      return <Leaf className="w-full h-full text-green-400/40" />;
    if (type === "droplet")
      return <Droplets className="w-full h-full text-blue-400/30" />;
    return <div className="w-full h-full rounded-full bg-amber-400/30" />;
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-green-900/70"></div>
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed animate-float pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size * 3}px`,
            height: `${p.size * 3}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <ParticleIcon type={p.type} />
        </div>
      ))}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0; height: 0; }
        .custom-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        .animate-float { animation: float linear infinite; }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.4s ease-out; }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 w-full flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-slide-in">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
                <Sun className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Buyer Dashboard
                </h1>
                <p className="text-emerald-200 text-xs sm:text-sm">
                  Arz-e-Pak Agriculture Platform
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 border border-red-400/30 rounded-xl text-white hover:bg-red-500/30 transition-all backdrop-blur-xl"
              onClick={() => {
                // ✅ Clear any saved session or user data
                localStorage.removeItem("userToken");
                localStorage.removeItem("userData");
  
                // ✅ Redirect to login page
                navigate("/login");
              }}
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>

          {/* Profile Card */}
          <div className="mb-8 animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative rounded-3xl p-6 sm:p-8 border border-white/40 bg-white/10 backdrop-blur-3xl shadow-[0_25px_70px_-20px_rgba(34,197,94,0.4)]">
              <div className="flex flex-col items-center sm:items-start text-white">
                <h2 className="text-2xl font-semibold">Bilal Khan</h2>
                <p className="text-white/70 text-sm mt-1">+92 321 5554321</p>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {dashboardCards.map((card, index) => (
              <div
                key={card.id}
                className="animate-slide-in group cursor-pointer"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => handleCardClick(card.path)}
              >
                <div
                  className={`relative rounded-2xl p-6 border border-white/40 bg-white/15 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)] hover:shadow-[0_25px_80px_-15px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-105 hover:bg-white/25 h-full`}
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {card.description}
                  </p>
                  {card.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}