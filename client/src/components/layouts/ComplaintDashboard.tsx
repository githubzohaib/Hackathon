import React, { useState, useEffect } from "react";
import { Sprout, Sun, CheckCircle, XCircle } from "lucide-react";

export default function ComplaintPage() {
  const [popup, setPopup] = useState<{ show: boolean; type: string; message: string }>({
    show: false,
    type: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  });

  const showPopup = (type: string, message: string) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.complaint)
      return showPopup("error", "Please fill all fields");
    showPopup("success", "Your complaint has been submitted successfully!");
    setFormData({ name: "", email: "", complaint: "" });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center relative overflow-hidden">
      {/* 🌿 Background */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-emerald-800/50 to-green-900/60"></div>
      </div>

      {/* 🌱 Popup */}
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

      {/* 🌾 Glassmorphic Box */}
      <div className="relative z-10 w-[600px] flex-grow flex items-center justify-center">
        <div className="relative rounded-3xl p-10 border border-white/30 bg-white/15 backdrop-blur-2xl shadow-[0_25px_70px_-20px_rgba(34,197,94,0.4)] w-full max-w-[600px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl"></div>

          {/* 🌞 Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-2xl mb-5 shadow-xl relative overflow-hidden">
              <Sprout className="w-10 h-10 text-white relative z-10" />
              <Sun className="absolute top-1 right-1 w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Arz-e-Pak</h1>
            <p className="text-emerald-100 text-sm">Complaint Submission Portal</p>
          </div>

          {/* 📋 Complaint Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-4 py-3.5 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20 transition-all"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-4 py-3.5 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20 transition-all"
            />

            <textarea
              placeholder="Enter your complaint..."
              value={formData.complaint}
              onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
              rows={4}
              className="w-full bg-white/10 border border-white/30 text-white rounded-xl px-4 py-3.5 placeholder-emerald-200 focus:outline-none focus:border-green-400 focus:bg-white/20 transition-all resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:from-green-500 hover:to-emerald-500 shadow-lg"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>

      {/* 🌿 Footer */}
      <footer className="text-white text-sm py-8 z-10">
        © 2025 <span className="font-semibold text-emerald-300">Arz-e-Pak</span>. All rights reserved.
      </footer>
    </div>
  );
}
