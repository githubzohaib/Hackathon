import React, { useEffect, useState } from "react";
import {
  Cloud,
  Droplets,
  Wind,
  Sun,
  AlertTriangle,
  Thermometer,
  MapPin,
  Sprout,
  Calendar,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

const API_KEY = "JWMARLCN9B8QLURM9X646KTZK";

interface WeatherCurrent {
  temp: number;
  feelslike: number;
  humidity: number;
  windspeed: number;
  visibility: number;
  conditions: string;
  uvindex: number;
  pressure: number;
  precipprob: number;
}

interface WeatherDay {
  datetime: string;
  temp: number;
  tempmax: number;
  tempmin: number;
  precip: number;
  precipprob: number;
  conditions: string;
  humidity: number;
}

interface IrrigationAdvice {
  waterAmount: number;
  recommendation: string;
  priority: "high" | "medium" | "low" | "none";
  bestTime: string;
  factors: Record<string, string>;
  weeklyOutlook: string;
}

interface CropType {
  name: string;
  urduName: string;
  waterNeed: string;
  season: string;
}

export const pakistanLocations = {
  "Punjab - Major Cities": ["Lahore", "Faisalabad", "Rawalpindi", "Multan"],
  "Sindh - Major Cities": ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
  "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad"],
  Balochistan: ["Quetta", "Gwadar", "Khuzdar"],
  "Gilgit-Baltistan & AJK": ["Gilgit", "Skardu", "Muzaffarabad"],
  "Islamabad Capital": ["Islamabad"],
};

export const cropTypes: CropType[] = [
  { name: "Wheat", urduName: "گندم", waterNeed: "Moderate", season: "Rabi (Oct-Apr)" },
  { name: "Rice", urduName: "چاول", waterNeed: "Very High", season: "Kharif (May-Sep)" },
  { name: "Cotton", urduName: "کپاس", waterNeed: "High", season: "Kharif (Apr-Oct)" },
  { name: "Sugarcane", urduName: "گنا", waterNeed: "Very High", season: "Year-round" },
  { name: "Maize", urduName: "مکئی", waterNeed: "Moderate", season: "Both Seasons" },
];

const PakistanWeatherIrrigation: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("Punjab - Major Cities");
  const [location, setLocation] = useState("Lahore");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [weatherData, setWeatherData] = useState<WeatherCurrent | null>(null);
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [irrigationAdvice, setIrrigationAdvice] = useState<IrrigationAdvice | null>(null);

  // 🌤 Fetch Weather Data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
      )},Pakistan?unitGroup=metric&key=${API_KEY}&contentType=json&include=days,current`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();

      const current: WeatherCurrent = {
        temp: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        windspeed: data.currentConditions.windspeed,
        visibility: data.currentConditions.visibility,
        conditions: data.currentConditions.conditions,
        uvindex: data.currentConditions.uvindex,
        pressure: data.currentConditions.pressure,
        precipprob: data.currentConditions.precipprob || 0,
      };

      setWeatherData(current);
      setForecast(data.days?.slice(0, 7) || []);
      generateIrrigationAdvice(current);
    } catch {
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // 💧 Generate Irrigation Advice
  const generateIrrigationAdvice = (current: WeatherCurrent) => {
    let advice: IrrigationAdvice = {
      waterAmount: 0,
      recommendation: "",
      priority: "none",
      bestTime: "Morning (6AM - 9AM)",
      factors: {},
      weeklyOutlook: "",
    };

    const crop = cropTypes.find((c) => c.name === selectedCrop);
    if (!crop) return;

    // Basic logic
    if (current.precipprob > 70) {
      advice.recommendation = "Rain expected soon, delay irrigation.";
      advice.priority = "none";
      advice.waterAmount = 0;
    } else if (current.temp > 35 && current.humidity < 40) {
      advice.recommendation = "High evaporation risk, irrigate early morning.";
      advice.priority = "high";
      advice.waterAmount = crop.waterNeed === "Very High" ? 40 : 25;
    } else if (current.temp < 15) {
      advice.recommendation = "Cool weather, reduce water usage.";
      advice.priority = "low";
      advice.waterAmount = 10;
    } else {
      advice.recommendation = "Normal weather, irrigate moderately.";
      advice.priority = "medium";
      advice.waterAmount = crop.waterNeed === "High" ? 25 : 15;
    }

    advice.factors = {
      Temperature: `${current.temp}°C`,
      Humidity: `${current.humidity}%`,
      "Rain Probability": `${current.precipprob}%`,
      Crop: `${selectedCrop}`,
    };
    advice.weeklyOutlook = "Next few days seem stable for scheduled irrigation.";

    setIrrigationAdvice(advice);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-screen w-full relative text-white">
      {/* 🌄 Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-green-900/70 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        {/* 🌱 Header */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
          <h1 className="text-4xl font-bold flex justify-center items-center gap-3">
            <Sprout className="text-emerald-300" /> Smart Irrigation Advisor
          </h1>
          <p className="text-emerald-200 mt-2 text-lg">
            Real-Time Weather • Smart Irrigation • Local Forecast
          </p>
        </div>

        {/* 🧭 Controls */}
        <div className="grid md:grid-cols-3 gap-6">
          {[["Region", selectedRegion, setSelectedRegion], ["City", location, setLocation], ["Crop", selectedCrop, setSelectedCrop]].map(
            ([label, value, setter], i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 shadow-lg"
              >
                <label className="text-emerald-100 font-semibold text-sm mb-2 block">
                  {label === "Region" && "Select Region"}
                  {label === "City" && "Select City / Area"}
                  {label === "Crop" && "Select Crop Type"}
                </label>
                <select
                  value={value as string}
                  onChange={(e) => {
                    if (label === "Region") {
                      const val = e.target.value;
                      (setter as any)(val);
                      setLocation(pakistanLocations[val as keyof typeof pakistanLocations][0]);
                    } else (setter as any)(e.target.value);
                  }}
                  className="w-full bg-white/5 text-white border border-white/20 rounded-xl p-3"
                >
                  {label === "Region"
                    ? Object.keys(pakistanLocations).map((r) => <option key={r}>{r}</option>)
                    : label === "City"
                    ? pakistanLocations[selectedRegion as keyof typeof pakistanLocations].map((c) => <option key={c}>{c}</option>)
                    : cropTypes.map((c) => (
                        <option key={c.name}>{c.name} - {c.urduName}</option>
                      ))}
                </select>
              </div>
            )
          )}
        </div>

        {/* 🔘 Button */}
        <button
          onClick={fetchWeatherData}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 font-bold hover:from-emerald-700 hover:to-green-700 transition"
        >
          {loading ? "Loading..." : "Update Weather Data"}
        </button>

        {/* 🌤 Current Weather */}
        {weatherData && (
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sun className="text-amber-300" /> Current Weather — {location}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Temperature", `${weatherData.temp}°C`, Thermometer],
                ["Humidity", `${weatherData.humidity}%`, Droplets],
                ["Wind", `${weatherData.windspeed} km/h`, Wind],
                ["Visibility", `${weatherData.visibility} km`, Eye],
              ].map(([name, val, Icon], i) => (
                <div
                  key={i}
                  className="p-4 bg-white/10 rounded-xl border border-white/20 shadow-inner text-center"
                >
                  <Icon className="mx-auto text-emerald-300 mb-2" />
                  <p className="text-xl font-semibold">{val}</p>
                  <p className="text-sm text-emerald-200">{name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 💧 Irrigation Advice */}
        {irrigationAdvice && (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
              <Droplets className="text-blue-300" /> Irrigation Advice
            </h2>
            <p className="text-lg font-semibold mb-2 text-emerald-100">
              {irrigationAdvice.recommendation}
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <p>
                  💧 <strong>Water Amount:</strong> {irrigationAdvice.waterAmount} mm
                </p>
                <p>
                  🕒 <strong>Best Time:</strong> {irrigationAdvice.bestTime}
                </p>
                <p>
                  ⚡ <strong>Priority:</strong>{" "}
                  <span
                    className={
                      irrigationAdvice.priority === "high"
                        ? "text-red-400"
                        : irrigationAdvice.priority === "medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }
                  >
                    {irrigationAdvice.priority.toUpperCase()}
                  </span>
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                {Object.entries(irrigationAdvice.factors).map(([key, val]) => (
                  <p key={key}>
                    🌿 <strong>{key}:</strong> {val}
                  </p>
                ))}
              </div>
            </div>
            <p className="text-emerald-200 mt-3">
              📅 {irrigationAdvice.weeklyOutlook}
            </p>
          </div>
        )}

        {/* ☀️ 7-Day Forecast */}
        {forecast.length > 0 && (
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <Calendar className="text-amber-300" /> 7-Day Forecast
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/10 border border-white/20 rounded-xl shadow-inner text-center"
                >
                  <p className="font-semibold">{day.datetime}</p>
                  <p className="text-sm text-emerald-200">{day.conditions}</p>
                  <p className="text-lg font-bold">{day.temp}°C</p>
                  <p className="text-xs text-blue-300">
                    💧 {day.precipprob}% Rain
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PakistanWeatherIrrigation;