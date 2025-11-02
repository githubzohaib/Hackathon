import React, { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Your API key here (replace with your own, keep it private)
  const API_KEY = "AIzaSyB4iFOLZ0hGQ_-szQKgxtilzWL6Uky7daE";

  // Use a model name that exists (e.g., "gemini-2.0-flash-lite") from official list
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
                parts: [{ text: `Tum agriculture expert ho. Simple Urdu me jawab do.\nUser: ${msg}` }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        // show error from API
        return `Error from API: ${data.error?.message || response.status}`;
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
    <div style={{
      width: "100%",
      maxWidth: 600,
      margin: "40px auto",
      padding: 15,
      border: "1px solid #ddd",
      borderRadius: 10
    }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>🌾 Farmer AI Chatbot</h2>

      <div style={{
        height: 350,
        overflowY: "auto",
        marginTop: 10,
        background: "#f5f5f5",
        borderRadius: 8,
        padding: 10
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            textAlign: m.role === "user" ? "right" : "left",
            marginBottom: 8
          }}>
            <span style={{
              display: "inline-block",
              padding: "8px 12px",
              background: m.role === "user" ? "#d1f8d1" : "#e7e7e7",
              borderRadius: 8
            }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p>⏳ Thinking…</p>}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Farming sawal likho..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #aaa"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 15px",
            background: "green",
            color: "#fff",
            borderRadius: 8
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
