import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Phone,
  Mail,
  MapPin,
  User,
  Cloud,
  TrendingUp,
  Bell,
  MessageCircle,
  Upload,
  X,
  Users,
  FileText,
  Edit2,
  Save,
  Leaf,
  Droplets,
  Sprout,
  Sun,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "Ahmed Ali",
    email: "ahmed@arzepak.com",
    phone: "‪+92 300 1234567‬",
    location: "Faisalabad, Punjab",
    farmSize: "15 Acres",
    crops: "Wheat, Cotton, Sugarcane",
    profileImage: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(profileData);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number; type: string }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      type: ["leaf", "droplet", "seed"][Math.floor(Math.random() * 3)],
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
      title: "Market Exchange",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-600",
      description: "Live crop prices & trends",
      path: "/market",
    },
    {
      id: 3,
      title: "Buyer Notifications",
      icon: Bell,
      gradient: "from-amber-500 to-orange-600",
      description: "Orders & buyer requests",
      path: "/notifications",
      badge: "3 New",
    },
    {
      id: 4,
      title: "Chat with Buyers",
      icon: MessageCircle,
      gradient: "from-purple-500 to-pink-600",
      description: "Direct buyer communication",
      path: "/buyer-chat",
    },
    {
      id: 5,
      title: "Expert Consultation",
      icon: Users,
      gradient: "from-teal-500 to-emerald-600",
      description: "Get agricultural guidance",
      path: "/expert-chat",
    },
    {
      id: 6,
      title: "Submit Complaint",
      icon: FileText,
      gradient: "from-red-500 to-rose-600",
      description: "Report issues & concerns",
      path: "/complaint",
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Max size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setEditData({ ...editData, profileImage: e.target.result as string });
        setShowImageUpload(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setProfileData(editData);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditData(profileData);
    setIsEditMode(false);
  };

  const ParticleIcon = ({ type }: { type: string }) => {
    if (type === "leaf") return <Leaf className="w-full h-full text-green-400/40" />;
    if (type === "droplet") return <Droplets className="w-full h-full text-blue-400/30" />;
    return <div className="w-full h-full rounded-full bg-amber-400/30" />;
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-green-900/70"></div>
      </div>

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

      <div className="relative z-10 w-full flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex justify-between items-center mb-8 animate-slide-in">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
                <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
                <Sun className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Farmer Dashboard</h1>
                <p className="text-emerald-200 text-xs sm:text-sm">Arz-e-Pak Agriculture Platform</p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 border border-red-400/30 rounded-xl text-white hover:bg-red-500/30 transition-all backdrop-blur-xl"
              onClick={() => console.log("Logout")}
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>

          {/* Profile Card - Glassmorphic */}
          <div className="mb-8 animate-slide-in" style={{ animationDelay: "0.1s" }}>
  <div className="relative rounded-3xl p-6 sm:p-8 border border-white/40 bg-white/10 backdrop-blur-3xl shadow-[0_25px_70px_-20px_rgba(34,197,94,0.4)]">
    
    {/* ✅ Farmer Name & Phone */}
    <div className="flex flex-col items-center sm:items-start text-white">
      <h2 className="text-2xl font-semibold">Ahmed Ali</h2>
      <p className="text-white/70 text-sm mt-1">+92 300 1234567</p>
    </div>

  </div>
</div>

          {/* Dashboard Cards - Glassmorphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardCards.map((card, index) => (
              <div
                key={card.id}
                className="animate-slide-in group cursor-pointer"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onClick={() => navigate(card.path)}
              >
                <div
                  className={`relative rounded-2xl p-6 border border-white/40 bg-white/15 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)] hover:shadow-[0_25px_80px_-15px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-105 hover:bg-white/25 h-full`}
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{card.description}</p>
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

      {/* Image Upload Modal - Glassmorphic */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="relative z-10 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-2xl p-6 w-[90%] sm:w-[400px] shadow-2xl"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">Upload Profile Image</h3>
              <button
                onClick={() => setShowImageUpload(false)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div
              className={`border-2 border-dashed ${
                dragActive ? "border-green-400 bg-white/10" : "border-white/30"
              } rounded-xl p-6 text-center transition-all`}
            >
              <Upload className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-white text-sm mb-2">
                Drag & drop image here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileInput}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all"
              >
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
