import React, { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyB4iFOLZ0hGQ_-szQKgxtilzWL6Uky7daE";
  const MODEL_NAME = "gemini-2.0-flash-lite";

  const sendToGemini = async (msg: string) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `Tum agriculture expert ho. Simple Urdu me jawab do.\nUser: ${msg}` }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        return `Error: ${data.error?.message || response.status}`;
      }

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return reply || "Samajh nahi aaya, dobara likho.";
    } catch (error) {
      console.error("Fetch error:", error);
      return "Network error — Internet ya key check karo.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    const reply = await sendToGemini(userMsg);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    setLoading(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-green-900/70"></div>

      {/* Glassmorphic Chat Container */}
      <div className="relative z-10 w-full max-w-lg p-6 rounded-3xl backdrop-blur-xl bg-white/15 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center mb-4 drop-shadow">
          🌾 Farmer AI Chatbot
        </h2>

        {/* Chat window */}
        <div className="h-96 overflow-y-auto mb-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-4 py-2 rounded-2xl ${
                  m.role === "user"
                    ? "bg-emerald-400/30 text-white backdrop-blur-sm border border-emerald-300/30"
                    : "bg-white/20 text-emerald-100 border border-white/30"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
          {loading && <p className="text-emerald-200 italic">⏳ Soch raha hoon...</p>}
        </div>

        {/* Input area */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Farming sawal likho..."
            className="flex-1 px-4 py-2 rounded-2xl bg-white/20 text-white placeholder-emerald-200 focus:outline-none border border-white/30"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
