import React, { useState, useEffect } from "react";
import { Cloud, Droplets, Wind, Sun, AlertTriangle, Thermometer, MapPin, Sprout, Calendar, TrendingUp, Eye } from "lucide-react";
//hello
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
  "Punjab - Major Cities": [
    "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", 
    "Sialkot", "Sargodha", "Bahawalpur", "Jhang", "Sheikhupura"
  ],
  "Punjab - Agricultural Areas": [
    "Okara", "Sahiwal", "Kasur", "Khanewal", "Vehari", "Pakpattan",
    "Rahim Yar Khan", "Muzaffargarh", "Layyah", "Mianwali", "Bhakkar",
    "Khushab", "Chiniot", "Hafizabad", "Narowal", "Bahawalnagar"
  ],
  "Sindh - Major Cities": [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah",
    "Mirpur Khas", "Jacobabad", "Shikarpur"
  ],
  "Sindh - Agricultural Areas": [
    "Thatta", "Badin", "Tando Allahyar", "Tando Muhammad Khan",
    "Matiari", "Sanghar", "Umerkot", "Tharparkar", "Ghotki",
    "Khairpur", "Naushahro Feroze", "Dadu"
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar", "Mardan", "Abbottabad", "Mingora", "Kohat",
    "Dera Ismail Khan", "Mansehra", "Swabi", "Charsadda", "Nowshera",
    "Bannu", "Haripur", "Swat", "Malakand", "Chitral"
  ],
  "Balochistan": [
    "Quetta", "Turbat", "Khuzdar", "Gwadar", "Sibi",
    "Zhob", "Loralai", "Mastung", "Kalat", "Dera Murad Jamali"
  ],
  "Gilgit-Baltistan & AJK": [
    "Gilgit", "Skardu", "Muzaffarabad", "Mirpur", "Hunza",
    "Ghanche", "Chilas", "Astore"
  ],
  "Islamabad Capital": ["Islamabad"]
};

export const cropTypes: CropType[] = [
  { name: "Wheat", urduName: "Gandum", waterNeed: "Moderate", season: "Rabi (Oct-Apr)" },
  { name: "Rice", urduName: "Chawal", waterNeed: "Very High", season: "Kharif (May-Sep)" },
  { name: "Cotton", urduName: "Kapas", waterNeed: "High", season: "Kharif (Apr-Oct)" },
  { name: "Sugarcane", urduName: "Ganna", waterNeed: "Very High", season: "Year-round" },
  { name: "Maize", urduName: "Makai", waterNeed: "Medium", season: "Kharif (Apr-Aug)" },
  { name: "Potato", urduName: "Aloo", waterNeed: "Medium", season: "Rabi (Oct-Mar)" },
  { name: "Tomato", urduName: "Tamatar", waterNeed: "Medium", season: "Both Seasons" },
  { name: "Onion", urduName: "Piyaz", waterNeed: "Medium", season: "Rabi (Nov-May)" },
  { name: "Mango Orchard", urduName: "Aam", waterNeed: "High", season: "Perennial" },
  { name: "Citrus", urduName: "Kinnow", waterNeed: "High", season: "Perennial" },
  { name: "Date Palm", urduName: "Khajoor", waterNeed: "Medium", season: "Perennial" },
  { name: "Fodder Crops", urduName: "Chara", waterNeed: "High", season: "Both Seasons" }
];

const PakistanWeatherIrrigation: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("Punjab - Major Cities");
  const [location, setLocation] = useState<string>("Lahore");
  const [selectedCrop, setSelectedCrop] = useState<string>("Wheat");
  const [weatherData, setWeatherData] = useState<WeatherCurrent | null>(null);
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [irrigationAdvice, setIrrigationAdvice] = useState<IrrigationAdvice | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)},Pakistan?unitGroup=metric&key=${API_KEY}&contentType=json&include=days,current`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      
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
        precipprob: data.currentConditions.precipprob || 0
      };
      
      setWeatherData(current);
      setForecast(data.days.slice(0, 7));
      calculateIrrigationAdvice(current, data.days);
    } catch (err) {
      setError("Error: Unable to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateIrrigationAdvice = (current: WeatherCurrent, days: WeatherDay[]) => {
    const temp = current.temp;
    const humidity = current.humidity;
    const precip = days[0].precip || 0;
    const windSpeed = current.windspeed;
    const nextDaysPrecip = days.slice(1, 4).reduce((sum, d) => sum + (d.precip || 0), 0);

    const crop = cropTypes.find(c => c.name === selectedCrop);
    if (!crop) return;
    
    let waterAmount = 0;
    let recommendation = "";
    let priority: "high" | "medium" | "low" | "none" = "low";
    let weeklyOutlook = "";

    const waterNeeds: Record<string, number> = {
      "Very High": 90,
      "High": 65,
      "Medium": 45,
      "Moderate": 40
    };
    waterAmount = waterNeeds[crop.waterNeed] || 40;

    if (temp > 38) waterAmount += 25;
    else if (temp > 35) waterAmount += 15;
    else if (temp > 30) waterAmount += 10;
    else if (temp < 20) waterAmount -= 15;
    else if (temp < 15) waterAmount -= 25;

    if (humidity < 25) waterAmount += 20;
    else if (humidity < 40) waterAmount += 10;
    else if (humidity > 75) waterAmount -= 15;

    if (windSpeed > 25) waterAmount += 15;
    else if (windSpeed > 15) waterAmount += 8;

    if (precip > 15) {
      waterAmount = 0;
      recommendation = "No irrigation needed - Sufficient rainfall received today";
      priority = "none";
    } else if (precip > 8) {
      waterAmount *= 0.2;
      recommendation = "Minimal irrigation required - Recent rainfall reduces water need";
      priority = "low";
    } else if (precip > 3) {
      waterAmount *= 0.5;
      recommendation = "Reduced irrigation needed - Light rainfall received";
      priority = "low";
    }

    if (!recommendation) {
      if (waterAmount > 90) {
        priority = "high";
        recommendation = "URGENT: High evaporation conditions - Immediate irrigation required";
      } else if (waterAmount > 65) {
        priority = "high";
        recommendation = "Regular irrigation strongly recommended for crop health";
      } else if (waterAmount > 40) {
        priority = "medium";
        recommendation = "Normal irrigation schedule - Maintain regular watering";
      } else if (waterAmount > 20) {
        priority = "low";
        recommendation = "Light irrigation is sufficient for current conditions";
      } else {
        priority = "low";
        recommendation = "Minimal irrigation needed at this time";
      }
    }

    if (nextDaysPrecip > 20) {
      weeklyOutlook = "Rain expected in next 3 days - Consider reducing watering schedule";
    } else if (nextDaysPrecip > 10) {
      weeklyOutlook = "Light rain possible in coming days - Maintain normal irrigation";
    } else {
      weeklyOutlook = "Dry weather expected - Continue regular irrigation schedule";
    }

    let bestTime = "";
    if (temp > 35) {
      bestTime = "Early morning (5-7 AM) or evening (7-9 PM) to minimize evaporation";
    } else if (temp > 28) {
      bestTime = "Morning (6-8 AM) or evening (6-8 PM) for optimal absorption";
    } else {
      bestTime = "Morning (7-10 AM) or late afternoon (5-7 PM)";
    }

    setIrrigationAdvice({
      waterAmount: Math.max(0, Math.round(waterAmount)),
      recommendation,
      priority,
      bestTime,
      weeklyOutlook,
      factors: {
        "Temperature": temp > 35 ? `Very hot (${temp}°C) - Increased water need` : temp > 28 ? `Warm (${temp}°C) - Normal water need` : `Moderate (${temp}°C)`,
        "Humidity": humidity < 35 ? `Low humidity (${humidity}%) - High evaporation` : humidity > 70 ? `High humidity (${humidity}%)` : `Good humidity levels (${humidity}%)`,
        "Rainfall": precip > 10 ? `Sufficient rainfall (${precip}mm)` : precip > 2 ? `Light rainfall (${precip}mm)` : "No recent rainfall",
        "Wind": windSpeed > 20 ? `Strong winds (${windSpeed} km/h) - Increases evaporation` : `Calm conditions (${windSpeed} km/h)`
      }
    });
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData && forecast.length > 0) {
      calculateIrrigationAdvice(weatherData, forecast);
    }
  }, [selectedCrop]);

  const getPriorityStyles = (priority: string) => {
    const styles: Record<string, string> = {
      high: "bg-gradient-to-br from-red-50 to-orange-50 border-red-400 shadow-red-100",
      medium: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-400 shadow-yellow-100",
      low: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-green-100",
      none: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-400 shadow-blue-100"
    };
    return styles[priority] || styles.low;
  };

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { text: string; color: string }> = {
      high: { text: "URGENT", color: "bg-red-600 text-white animate-pulse" },
      medium: { text: "IMPORTANT", color: "bg-yellow-600 text-white" },
      low: { text: "NORMAL", color: "bg-green-600 text-white" },
      none: { text: "NONE", color: "bg-blue-600 text-white" }
    };
    const badge = badges[priority] || badges.low;
    return <span className={`px-3 py-1 rounded-full text-sm font-bold ${badge.color}`}>{badge.text}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Sprout className="w-10 h-10" />
                Pakistan Agricultural Weather System
              </h1>
              <p className="text-emerald-100 text-lg">Smart Irrigation & Weather Monitoring</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-green-300 transition-all">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <MapPin className="w-5 h-5 text-green-600" />
              Select Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                const regionKey = e.target.value as keyof typeof pakistanLocations;
                setLocation(pakistanLocations[regionKey][0]);
              }}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 font-semibold"
            >
              {Object.keys(pakistanLocations).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-green-300 transition-all">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              City/Area
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 font-semibold"
            >
              {pakistanLocations[selectedRegion as keyof typeof pakistanLocations].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-green-300 transition-all">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <Sprout className="w-5 h-5 text-amber-600" />
              Crop Type
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 font-semibold"
            >
              {cropTypes.map(crop => (
                <option key={crop.name} value={crop.name}>
                  {crop.name} - {crop.urduName}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {cropTypes.find(c => c.name === selectedCrop)?.season}
            </p>
          </div>
        </div>

        <button
          onClick={fetchWeatherData}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Loading...
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              Update Weather Data
            </>
          )}
        </button>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-xl mb-6 shadow-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {weatherData && (
          <>
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sun className="w-7 h-7 text-yellow-500" />
                  Current Weather - {location}
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {weatherData.conditions}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="text-red-600 w-6 h-6" />
                    <span className="text-sm font-bold text-gray-700">Temperature</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{weatherData.temp}°C</p>
                  <p className="text-xs text-gray-600 mt-1">Feels like: {weatherData.feelslike}°C</p>
                </div>

                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="text-blue-600 w-6 h-6" />
                    <span className="text-sm font-bold text-gray-700">Humidity</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{weatherData.humidity}%</p>
                  <p className="text-xs text-gray-600 mt-1">Moisture Level</p>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-teal-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="text-green-600 w-6 h-6" />
                    <span className="text-sm font-bold text-gray-700">Wind Speed</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{weatherData.windspeed}</p>
                  <p className="text-xs text-gray-600 mt-1">km/h</p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="text-purple-600 w-6 h-6" />
                    <span className="text-sm font-bold text-gray-700">Visibility</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{weatherData.visibility}</p>
                  <p className="text-xs text-gray-600 mt-1">km</p>
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">UV Index</p>
                  <p className="text-lg font-bold text-gray-800">{weatherData.uvindex}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Pressure</p>
                  <p className="text-lg font-bold text-gray-800">{weatherData.pressure} mb</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Rain Probability</p>
                  <p className="text-lg font-bold text-gray-800">{weatherData.precipprob}%</p>
                </div>
              </div>
            </div>

            {irrigationAdvice && (
              <div className={`rounded-2xl shadow-2xl p-6 md:p-8 mb-6 border-2 ${getPriorityStyles(irrigationAdvice.priority)}`}>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <Droplets className="w-8 h-8 text-blue-600" />
                    Irrigation Recommendation
                  </h2>
                  {getPriorityBadge(irrigationAdvice.priority)}
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-md">
                  <p className="text-lg md:text-xl mb-4 font-semibold text-gray-700 leading-relaxed">
                    {irrigationAdvice.recommendation}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Water Amount Required</p>
                      <p className="text-4xl font-bold text-blue-700">
                        {irrigationAdvice.waterAmount > 0 ? `${irrigationAdvice.waterAmount} mm` : "0 mm"}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        For {selectedCrop} ({cropTypes.find(c => c.name === selectedCrop)?.urduName})
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border-2 border-amber-200">
                      <p className="text-sm text-gray-600 mb-2">Best Irrigation Time</p>
                      <p className="text-lg font-bold text-amber-800 leading-relaxed">
                        {irrigationAdvice.bestTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {Object.entries(irrigationAdvice.factors).map(([key, value]) => (
                    <div key={key} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                      <p className="text-sm font-bold text-gray-700 mb-1">{key}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border-2 border-indigo-200">
                  <p className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Weekly Outlook
                  </p>
                  <p className="text-gray-700 leading-relaxed">{irrigationAdvice.weeklyOutlook}</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="w-7 h-7 text-blue-600" />
                7-Day Weather Forecast
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {forecast.map((day, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all">
                    <p className="font-bold text-gray-700 text-sm mb-3 text-center">
                      {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <Sun className="text-yellow-500 mx-auto mb-3" size={28} />
                    <p className="text-center font-bold text-2xl text-gray-800">{Math.round(day.temp)}°C</p>
                    <p className="text-center text-xs text-gray-600 mt-1">
                      H: {Math.round(day.tempmax)}° L: {Math.round(day.tempmin)}°
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-center text-xs text-blue-600 font-semibold">
                        {day.precip > 0 ? `${day.precip}mm rain` : 'No rain'}
                      </p>
                      <p className="text-center text-xs text-gray-500 mt-1">{day.conditions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PakistanWeatherIrrigation;