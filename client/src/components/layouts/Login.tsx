import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  Leaf,
  Shield,
  ArrowRight,
  Sprout,
  Sun,
  Droplets,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ArzEPakLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [rememberMe, setRememberMe] = useState(false);

  const [popup, setPopup] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: "",
    message: "",
  });

  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number; type: string }[]
  >([]);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", phone: "", email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");

  const [users, setUsers] = useState([
    { email: "demo@arzepak.com", password: "Demo123!", name: "Demo User", phone: "1234567890" },
  ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 12 + 18,
      delay: Math.random() * 8,
      type: ["leaf", "droplet", "seed"][Math.floor(Math.random() * 3)],
    }));
    setParticles(newParticles);
  }, []);

  const showPopup = (type: string, message: string) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3500);
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Role-based Login
  const handleLogin = () => {
    if (!validateEmail(loginData.email)) return showPopup("error", "Please enter a valid email address");
    if (loginData.password.length < 8) return showPopup("error", "Password must be at least 8 characters long");
    const user = users.find((u) => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      showPopup("success", `Welcome back, ${selectedRole}! Redirecting...`);
      if (rememberMe) localStorage.setItem("rememberedUser", JSON.stringify(user));
      setTimeout(() => {
        switch (selectedRole) {
          case "farmer":
            navigate("/farmerdashboard");
            break;
          case "expert":
            navigate("/expertdashboard");
            break;
          case "admin":
            navigate("/admindashboard");
            break;
          case "buyer":
            navigate("/buyerdashboard");
            break;
          default:
            navigate("/");
        }
      }, 2000);
    } else showPopup("error", "Invalid credentials. Please try again.");
  };

  // ✅ Signup Handler
  const handleSignup = () => {
    if (!signupData.name || !signupData.email || !signupData.password)
      return showPopup("error", "Please fill all fields");
    if (!validateEmail(signupData.email)) return showPopup("error", "Enter a valid email");
    if (signupData.password.length < 8) return showPopup("error", "Password must be at least 8 characters long");
    setUsers([...users, signupData]);
    showPopup("success", "Account created successfully! Please log in.");
    setIsLogin(true);
  };

  // ✅ Forgot Password
  const handleForgot = () => {
    if (!validateEmail(resetEmail)) return showPopup("error", "Please enter a valid email address");
    showPopup("success", "Password reset link sent to your email.");
    setTimeout(() => setIsForgotPassword(false), 2500);
  };

  const ParticleIcon = ({ type }: { type: string }) => {
    if (type === "leaf") return <Leaf className="w-full h-full text-green-400/40" />;
    if (type === "droplet") return <Droplets className="w-full h-full text-blue-400/30" />;
    return <div className="w-full h-full rounded-full bg-amber-400/30" />;
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center relative overflow-hidden">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-emerald-800/50 to-green-900/60"></div>
      </div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
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

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-xl border max-w-md mx-4 backdrop-blur-xl ${
            popup.type === "success"
              ? "bg-green-600/95 border-green-500/50"
              : "bg-amber-600/95 border-amber-500/50"
          } animate-slide-down`}
        >
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-full bg-white/20">
              {popup.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <p className="font-semibold text-sm">{popup.message}</p>
          </div>
        </div>
      )}

      {/* Glass Box */}
      <div className="relative z-10 w-[600px] flex-grow flex items-center justify-center">
        <div className="relative rounded-3xl p-10 border border-white/30 bg-white/15 backdrop-blur-2xl shadow-[0_25px_70px_-20px_rgba(34,197,94,0.4)] w-full max-w-[600px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-2xl mb-5 shadow-xl relative overflow-hidden">
              <Sprout className="w-10 h-10 text-white relative z-10" />
              <Sun className="absolute top-1 right-1 w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Arz-e-Pak</h1>
            <p className="text-emerald-100 text-sm">Smart Agriculture Platform</p>
          </div>

          {/* Role Buttons (Hide for Forgot Password) */}
          {!isForgotPassword && (
            <div className="flex justify-between mb-6">
              {["farmer", "expert", "admin", "buyer"].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 mx-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedRole === role
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white/10 text-white hover:bg-emerald-500/40"
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Conditional Forms */}
          {isForgotPassword ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-4 py-3.5 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20 transition-all mb-5"
              />
              <button
                onClick={handleForgot}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-500"
              >
                Send Reset Link
              </button>
              <p
                onClick={() => setIsForgotPassword(false)}
                className="text-center text-sm text-white mt-4 cursor-pointer hover:text-emerald-300"
              >
                Back to Login
              </p>
            </>
          ) : isLogin ? (
            <>
              {/* Forgot Password Link */}
              <p
                onClick={() => setIsForgotPassword(true)}
                className="text-right text-sm text-white mb-3 cursor-pointer hover:text-emerald-300"
              >
                Forgot Password?
              </p>

              {/* Login Inputs */}
              <div className="space-y-5">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-12 py-3.5 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-12 py-3.5 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20 transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-300 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Remember Me */}
                <div className="flex items-center text-white gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className="text-sm">Remember me</span>
                </div>

                {/* Access Button */}
                <button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:from-green-500 hover:to-emerald-500 shadow-lg flex items-center justify-center gap-2"
                >
                  Access Dashboard <ArrowRight className="w-5 h-5" />
                </button>

                {/* Create Account */}
                <p className="text-center text-sm text-white mt-5">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="cursor-pointer text-emerald-300 hover:underline"
                  >
                    Create Account
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Signup Form */}
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-12 py-3 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-12 py-3 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-12 py-3 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 8 chars)"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-12 py-3 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20"
                  />
                </div>
                <button
                  onClick={handleSignup}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:from-green-500 hover:to-emerald-500 shadow-lg"
                >
                  Sign Up
                </button>
                <p
                  onClick={() => setIsLogin(true)}
                  className="text-center text-sm text-white mt-5 cursor-pointer hover:text-emerald-300"
                >
                  Already have an account? Login
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-sm py-8 z-10">
        © 2025 <span className="font-semibold text-emerald-300">Arz-e-Pak</span>. All rights reserved.
      </footer>
    </div>
  );
}
