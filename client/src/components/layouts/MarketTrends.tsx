import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Sprout,
  Sun,
} from "lucide-react";

/**
 * MarketTrends (UI upgraded: glassmorphic everywhere + login-style background with particles)
 * - Keeps all original dataset & logic
 * - Adds floating particles (leaf / droplet / seed) like your login screen
 * - All cards and panels use glassmorphic classes:
 *     bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg
 *
 * Tailwind required.
 */

export default function MarketTrends() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [viewMode, setViewMode] = useState("grid");

  // --- full dataset (unchanged from original) ---
  const pricingData = [
    { id: 1, name: "Wheat", category: "Grains", currentPrice: 85, previousPrice: 82, weekAgo: 80, monthAgo: 78, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Grade A", volatility: "low", demand: "high" },
    { id: 2, name: "Rice (Basmati)", category: "Grains", currentPrice: 120, previousPrice: 125, weekAgo: 128, monthAgo: 122, unit: "per 40kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Premium", volatility: "medium", demand: "high" },
    { id: 3, name: "Sugarcane", category: "Cash Crops", currentPrice: 300, previousPrice: 300, weekAgo: 298, monthAgo: 295, unit: "per 40kg", trend: "stable", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "low", demand: "medium" },
    { id: 4, name: "Cotton", category: "Cash Crops", currentPrice: 8500, previousPrice: 8300, weekAgo: 8200, monthAgo: 8000, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Grade A", volatility: "high", demand: "high" },
    { id: 5, name: "Maize", category: "Grains", currentPrice: 65, previousPrice: 65, weekAgo: 64, monthAgo: 62, unit: "per 40kg", trend: "stable", lastUpdated: "2025-11-02", region: "KPK", quality: "Standard", volatility: "low", demand: "medium" },
    { id: 6, name: "Tomatoes", category: "Vegetables", currentPrice: 45, previousPrice: 45, weekAgo: 50, monthAgo: 40, unit: "per kg", trend: "stable", lastUpdated: "2025-11-02", region: "Punjab", quality: "Grade A", volatility: "high", demand: "high" },
    { id: 7, name: "Potatoes", category: "Vegetables", currentPrice: 35, previousPrice: 32, weekAgo: 30, monthAgo: 28, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Grade A", volatility: "medium", demand: "high" },
    { id: 8, name: "Onions", category: "Vegetables", currentPrice: 55, previousPrice: 60, weekAgo: 62, monthAgo: 58, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Grade A", volatility: "high", demand: "high" },
    { id: 9, name: "Mangoes", category: "Fruits", currentPrice: 150, previousPrice: 145, weekAgo: 142, monthAgo: 135, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Premium", volatility: "medium", demand: "high" },
    { id: 10, name: "Dates", category: "Fruits", currentPrice: 280, previousPrice: 270, weekAgo: 265, monthAgo: 260, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Balochistan", quality: "Premium", volatility: "low", demand: "medium" },
    { id: 11, name: "Chickpeas", category: "Grains", currentPrice: 120, previousPrice: 118, weekAgo: 115, monthAgo: 112, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Grade A", volatility: "low", demand: "medium" },
    { id: 12, name: "Lentils", category: "Grains", currentPrice: 140, previousPrice: 145, weekAgo: 148, monthAgo: 142, unit: "per 40kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "medium", demand: "medium" },
    { id: 13, name: "Broiler Chicken (Live)", category: "Livestock", currentPrice: 397, previousPrice: 383, weekAgo: 370, monthAgo: 355, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard Broiler", volatility: "high", demand: "high" },
    { id: 14, name: "Broiler Chicken (Meat)", category: "Livestock", currentPrice: 595, previousPrice: 570, weekAgo: 550, monthAgo: 520, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "high", demand: "high" },
    { id: 15, name: "Lentils (Masoor Dal)", category: "Grains", currentPrice: 260, previousPrice: 245, weekAgo: 240, monthAgo: 230, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "medium", demand: "medium" },
    { id: 16, name: "Lentils (Chana Dal)", category: "Grains", currentPrice: 250, previousPrice: 240, weekAgo: 235, monthAgo: 230, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "medium", demand: "medium" },
    { id: 17, name: "Live Cow (Beef)", category: "Livestock", currentPrice: 1700, previousPrice: 1650, weekAgo: 1600, monthAgo: 1550, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "medium", demand: "high" },
    { id: 18, name: "Sugar (Refined)", category: "Cash Crops", currentPrice: 95, previousPrice: 97, weekAgo: 100, monthAgo: 98, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Refined", volatility: "medium", demand: "high" },
    { id: 19, name: "Sesame Seeds (Till)", category: "Cash Crops", currentPrice: 8500, previousPrice: 8000, weekAgo: 8200, monthAgo: 7800, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Premium", volatility: "high", demand: "medium" },
    { id: 20, name: "Sunflower Oil Seed", category: "Cash Crops", currentPrice: 6200, previousPrice: 6000, weekAgo: 5900, monthAgo: 5800, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "medium", demand: "medium" },
    { id: 21, name: "Barley", category: "Grains", currentPrice: 48, previousPrice: 46, weekAgo: 45, monthAgo: 43, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "low", demand: "medium" },
    { id: 22, name: "Bajra (Pearl Millet)", category: "Grains", currentPrice: 38, previousPrice: 39, weekAgo: 40, monthAgo: 42, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "medium", demand: "low" },
    { id: 23, name: "Sorghum (Jowar)", category: "Grains", currentPrice: 52, previousPrice: 50, weekAgo: 49, monthAgo: 47, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "low", demand: "medium" },
    { id: 24, name: "Mustard Seed", category: "Cash Crops", currentPrice: 7000, previousPrice: 6800, weekAgo: 6700, monthAgo: 6500, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Good", volatility: "medium", demand: "medium" },
    { id: 25, name: "Rapeseed", category: "Cash Crops", currentPrice: 6400, previousPrice: 6300, weekAgo: 6200, monthAgo: 6000, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "medium", demand: "medium" },
    { id: 26, name: "Soybean (Seed)", category: "Cash Crops", currentPrice: 5800, previousPrice: 5900, weekAgo: 6000, monthAgo: 6100, unit: "per 40kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "medium", demand: "medium" },
    { id: 27, name: "Sunflower Oil (Refined)", category: "Oils", currentPrice: 450, previousPrice: 440, weekAgo: 435, monthAgo: 420, unit: "per litre", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Refined", volatility: "medium", demand: "high" },
    { id: 28, name: "Palm Oil (Refined)", category: "Oils", currentPrice: 380, previousPrice: 385, weekAgo: 390, monthAgo: 395, unit: "per litre", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Refined", volatility: "medium", demand: "high" },
    { id: 29, name: "Soybean Oil (Refined)", category: "Oils", currentPrice: 420, previousPrice: 410, weekAgo: 405, monthAgo: 400, unit: "per litre", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Refined", volatility: "medium", demand: "high" },
    { id: 30, name: "Tea Leaves (Loose)", category: "Beverages", currentPrice: 650, previousPrice: 640, weekAgo: 630, monthAgo: 620, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "BOP", volatility: "low", demand: "high" },
    { id: 31, name: "Black Tea (Packet)", category: "Beverages", currentPrice: 720, previousPrice: 700, weekAgo: 690, monthAgo: 680, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "CTC", volatility: "low", demand: "high" },
    { id: 32, name: "Green Tea (Leaves)", category: "Beverages", currentPrice: 1100, previousPrice: 1080, weekAgo: 1060, monthAgo: 1050, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Premium", volatility: "medium", demand: "medium" },
    { id: 33, name: "Chili (Whole)", category: "Spices", currentPrice: 1200, previousPrice: 1250, weekAgo: 1270, monthAgo: 1300, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Red", volatility: "high", demand: "high" },
    { id: 34, name: "Turmeric (Haldi)", category: "Spices", currentPrice: 900, previousPrice: 880, weekAgo: 870, monthAgo: 860, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Dry", volatility: "medium", demand: "medium" },
    { id: 35, name: "Cumin (Zeera)", category: "Spices", currentPrice: 3200, previousPrice: 3150, weekAgo: 3100, monthAgo: 3000, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Premium", volatility: "high", demand: "medium" },
    { id: 36, name: "Fenugreek (Methi Seed)", category: "Spices", currentPrice: 1400, previousPrice: 1380, weekAgo: 1360, monthAgo: 1300, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "medium", demand: "low" },
    { id: 37, name: "Garlic", category: "Vegetables", currentPrice: 300, previousPrice: 320, weekAgo: 330, monthAgo: 340, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Punjab", quality: "Grade A", volatility: "high", demand: "high" },
    { id: 38, name: "Ginger", category: "Vegetables", currentPrice: 950, previousPrice: 920, weekAgo: 900, monthAgo: 880, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Balochistan", quality: "Fresh", volatility: "high", demand: "medium" },
    { id: 39, name: "Carrots", category: "Vegetables", currentPrice: 80, previousPrice: 75, weekAgo: 70, monthAgo: 68, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Grade A", volatility: "low", demand: "medium" },
    { id: 40, name: "Cauliflower", category: "Vegetables", currentPrice: 120, previousPrice: 125, weekAgo: 130, monthAgo: 115, unit: "per kg", trend: "stable", lastUpdated: "2025-11-02", region: "Punjab", quality: "Grade A", volatility: "high", demand: "medium" },
    { id: 41, name: "Cabbage", category: "Vegetables", currentPrice: 60, previousPrice: 58, weekAgo: 55, monthAgo: 50, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "low", demand: "medium" },
    { id: 42, name: "Okra (Bhindi)", category: "Vegetables", currentPrice: 140, previousPrice: 145, weekAgo: 150, monthAgo: 155, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Punjab", quality: "Fresh", volatility: "high", demand: "medium" },
    { id: 43, name: "Eggplant (Baingan)", category: "Vegetables", currentPrice: 85, previousPrice: 80, weekAgo: 78, monthAgo: 75, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Grade A", volatility: "medium", demand: "medium" },
    { id: 44, name: "Coriander Leaves", category: "Vegetables", currentPrice: 40, previousPrice: 42, weekAgo: 45, monthAgo: 50, unit: "per bunch", trend: "down", lastUpdated: "2025-11-02", region: "Punjab", quality: "Fresh", volatility: "high", demand: "low" },
    { id: 45, name: "Mint (Pudina)", category: "Vegetables", currentPrice: 35, previousPrice: 36, weekAgo: 38, monthAgo: 40, unit: "per bunch", trend: "down", lastUpdated: "2025-11-02", region: "Punjab", quality: "Fresh", volatility: "medium", demand: "low" },
    { id: 46, name: "Almonds (Badam)", category: "Nuts", currentPrice: 2200, previousPrice: 2150, weekAgo: 2100, monthAgo: 2000, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Balochistan", quality: "Premium", volatility: "medium", demand: "medium" },
    { id: 47, name: "Walnuts (Akhrot)", category: "Nuts", currentPrice: 1800, previousPrice: 1750, weekAgo: 1700, monthAgo: 1650, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Premium", volatility: "medium", demand: "medium" },
    { id: 48, name: "Pistachios (Pista)", category: "Nuts", currentPrice: 3500, previousPrice: 3450, weekAgo: 3400, monthAgo: 3300, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Balochistan", quality: "Premium", volatility: "high", demand: "high" },
    { id: 49, name: "Honey (Natural)", category: "Other", currentPrice: 1600, previousPrice: 1580, weekAgo: 1550, monthAgo: 1500, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Pure", volatility: "low", demand: "medium" },
    { id: 50, name: "Milk (Fresh)", category: "Dairy", currentPrice: 200, previousPrice: 195, weekAgo: 190, monthAgo: 185, unit: "per litre", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Full Cream", volatility: "medium", demand: "high" },
    { id: 51, name: "Ghee (Desi)", category: "Dairy", currentPrice: 1600, previousPrice: 1580, weekAgo: 1550, monthAgo: 1500, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Desi", volatility: "medium", demand: "high" },
    { id: 52, name: "Yogurt (Dahi)", category: "Dairy", currentPrice: 220, previousPrice: 215, weekAgo: 210, monthAgo: 205, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Fresh", volatility: "low", demand: "medium" },
    { id: 53, name: "Butter (Salted)", category: "Dairy", currentPrice: 950, previousPrice: 930, weekAgo: 920, monthAgo: 900, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Packaged", volatility: "low", demand: "medium" },
    { id: 54, name: "Rohu Fish (Local)", category: "Fish", currentPrice: 480, previousPrice: 470, weekAgo: 460, monthAgo: 450, unit: "per kg",trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Fresh", volatility: "high", demand: "medium" },
    { id: 55, name: "Prawns (Fresh)", category: "Fish", currentPrice: 1400, previousPrice: 1350, weekAgo: 1320, monthAgo: 1300, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Premium", volatility: "high", demand: "high" },
    { id: 56, name: "Honeyed Dates (Kharak)", category: "Fruits", currentPrice: 320, previousPrice: 310, weekAgo: 305, monthAgo: 300, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Balochistan", quality: "Premium", volatility: "low", demand: "medium" },
    { id: 57, name: "Apples (Local)", category: "Fruits", currentPrice: 220, previousPrice: 215, weekAgo: 210, monthAgo: 200, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Grade A", volatility: "low", demand: "medium" },
    { id: 58, name: "Oranges (Kinnow)", category: "Fruits", currentPrice: 140, previousPrice: 135, weekAgo: 130, monthAgo: 125, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Standard", volatility: "low", demand: "high" },
    { id: 59, name: "Guava", category: "Fruits", currentPrice: 95, previousPrice: 100, weekAgo: 105, monthAgo: 110, unit: "per kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Standard", volatility: "medium", demand: "low" },
    { id: 60, name: "Strawberries", category: "Fruits", currentPrice: 1200, previousPrice: 1150, weekAgo: 1100, monthAgo: 1000, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Premium", volatility: "high", demand: "medium" },
    { id: 61, name: "Soybean Meal (Feed)", category: "Feed", currentPrice: 4400, previousPrice: 4350, weekAgo: 4300, monthAgo: 4200, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Feed Grade", volatility: "medium", demand: "high" },
    { id: 62, name: "Maize (Animal Feed)", category: "Feed", currentPrice: 62, previousPrice: 60, weekAgo: 59, monthAgo: 57, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "Feed Grade", volatility: "low", demand: "high" },
    { id: 63, name: "Compound Feed (Broiler)", category: "Feed", currentPrice: 180, previousPrice: 175, weekAgo: 170, monthAgo: 165, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Pellet", volatility: "high", demand: "high" },
    { id: 64, name: "Fertilizer (DAP)", category: "Inputs", currentPrice: 2100, previousPrice: 2050, weekAgo: 2000, monthAgo: 1950, unit: "per bag (50kg)", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "AG Grade", volatility: "high", demand: "high" },
    { id: 65, name: "Fertilizer (Urea)", category: "Inputs", currentPrice: 1450, previousPrice: 1400, weekAgo: 1380, monthAgo: 1350, unit: "per bag (50kg)", trend: "up", lastUpdated: "2025-11-02", region: "Sindh", quality: "AG Grade", volatility: "high", demand: "high" },
    { id: 66, name: "Seed (Wheat Certified)", category: "Inputs", currentPrice: 3200, previousPrice: 3150, weekAgo: 3100, monthAgo: 3000, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Certified", volatility: "low", demand: "high" },
    { id: 67, name: "Seed (Rice Certified)", category: "Inputs", currentPrice: 4200, previousPrice: 4250, weekAgo: 4300, monthAgo: 4350, unit: "per 40kg", trend: "down", lastUpdated: "2025-11-02", region: "Sindh", quality: "Certified", volatility: "medium", demand: "high" },
    { id: 68, name: "Cottonseed (For Oil)", category: "Cash Crops", currentPrice: 3200, previousPrice: 3150, weekAgo: 3100, monthAgo: 3000, unit: "per 40kg", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Oilseed", volatility: "medium", demand: "medium" },
    { id: 69, name: "Leather (Raw Hides)", category: "Byproducts", currentPrice: 2600, previousPrice: 2550, weekAgo: 2500, monthAgo: 2450, unit: "per hide", trend: "up", lastUpdated: "2025-11-02", region: "Punjab", quality: "Raw", volatility: "medium", demand: "low" },
    { id: 70, name: "Wool (Raw)", category: "Byproducts", currentPrice: 800, previousPrice: 780, weekAgo: 760, monthAgo: 740, unit: "per kg", trend: "up", lastUpdated: "2025-11-02", region: "KPK", quality: "Raw", volatility: "medium", demand: "low" }
  ];

  const categories = ["All", "Grains", "Vegetables", "Fruits", "Cash Crops"];
  const timeframes = [
    { value: "day", label: "24 Hours" },
    { value: "week", label: "7 Days" },
    { value: "month", label: "30 Days" },
  ];

  // --- particles config (login-like floating particles) ---
  const [particles, setParticles] = useState(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 28 + 8,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * 6,
        type: ["leaf", "droplet", "seed"][Math.floor(Math.random() * 3)],
      }))
  );

  useEffect(() => {
    // refresh particles positions slowly every 20s (subtle)
    const t = setInterval(() => {
      setParticles((p) =>
        p.map((pt) => ({ ...pt, x: Math.random() * 100, y: Math.random() * 100 }))
      );
    }, 20000);
    return () => clearInterval(t);
  }, []);

  const filteredData = pricingData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateChange = (current, previous) => {
    if (previous === 0) return "0.0";
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getComparisonPrice = (item) => {
    if (selectedTimeframe === "day") return item.previousPrice;
    if (selectedTimeframe === "week") return item.weekAgo;
    return item.monthAgo;
  };

  const getTrendStats = () => {
    const uptrend = filteredData.filter((item) => item.trend === "up").length;
    const downtrend = filteredData.filter((item) => item.trend === "down").length;
    const stable = filteredData.filter((item) => item.trend === "stable").length;
    return { uptrend, downtrend, stable };
  };

  const stats = getTrendStats();

  const getVolatilityColor = (volatility) => {
    if (volatility === "high") return "text-red-700 bg-red-50";
    if (volatility === "medium") return "text-yellow-700 bg-yellow-50";
    return "text-green-700 bg-green-50";
  };

  const getDemandColor = (demand) => {
    if (demand === "high") return "text-emerald-700 bg-emerald-50";
    if (demand === "medium") return "text-blue-700 bg-blue-50";
    return "text-gray-700 bg-gray-50";
  };

  // Small helper to show particle icon markup
  const ParticleIcon = ({ type }) => {
    if (type === "leaf")
      return (
        <div className="w-full h-full flex items-center justify-center text-green-400/50">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <path d="M3 21c9-6 12-12 18-18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      );
    if (type === "droplet")
      return (
        <div className="w-full h-full flex items-center justify-center text-blue-300/40">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <path d="M12 2c3 4 6 6 6 10a6 6 0 1 1-12 0c0-4 3-6 6-10z" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
      );
    return <div className="w-full h-full rounded-full bg-amber-300/30" />;
  };

  return (
    <div className="min-h-screen relative">
      {/* Background image (login-like), fixed + gradient overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-emerald-800/50 to-green-900/60"></div>
      </div>

      {/* Particles (floating) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate(-50%, -50%)`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.9,
            filter: "blur(0.2px)",
            zIndex: 5,
          }}
        >
          <ParticleIcon type={p.type} />
        </div>
      ))}

      {/* page content overlay */}
      <div className="relative z-20 min-h-screen backdrop-blur-sm bg-black/30 text-white">
        {/* top header - glassmorphic */}
        <header className="max-w-7xl mx-auto p-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl px-6 py-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-xl shadow-2xl overflow-hidden">
                <Sprout className="w-7 h-7 text-white z-10" />
                <Sun className="absolute top-1 right-1 w-3 h-3 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Arz-e-Pak</h1>
                <p className="text-xs text-emerald-200">Market Trends & Analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/5 backdrop-blur rounded-lg px-4 py-2 border border-white/10">
                <p className="text-xs text-emerald-200">Last Updated</p>
                <p className="text-sm font-semibold text-white">Nov 2, 2025</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 pb-24">
          {/* stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-200 mb-1">Trending Up</p>
                  <p className="text-3xl font-bold text-emerald-200">{stats.uptrend}</p>
                  <p className="text-xs text-emerald-100 mt-1">Crops increasing</p>
                </div>
                <div className="bg-emerald-600/20 p-3 rounded-full">
                  <ArrowUp size={28} className="text-emerald-200" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-200 mb-1">Trending Down</p>
                  <p className="text-3xl font-bold text-amber-200">{stats.downtrend}</p>
                  <p className="text-xs text-amber-100 mt-1">Crops decreasing</p>
                </div>
                <div className="bg-amber-600/20 p-3 rounded-full">
                  <ArrowDown size={28} className="text-amber-200" />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-200 mb-1">Stable Prices</p>
                  <p className="text-3xl font-bold text-slate-200">{stats.stable}</p>
                  <p className="text-xs text-slate-100 mt-1">No change</p>
                </div>
                <div className="bg-white/10 p-3 rounded-full">
                  <Minus size={28} className="text-slate-200" />
                </div>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200" size={18} />
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200" size={18} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="text-black">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200" size={18} />
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {timeframes.map((tf) => (
                    <option key={tf.value} value={tf.value} className="text-black">
                      {tf.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <BarChart3 size={16} className="inline mr-2" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <Activity size={16} className="inline mr-2" />
                  List
                </button>
              </div>
            </div>
          </div>

          {/* cards or table */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((crop) => {
                const comparisonPrice = getComparisonPrice(crop);
                const change = calculateChange(crop.currentPrice, comparisonPrice);
                const isPositive = parseFloat(change) > 0;
                const isNegative = parseFloat(change) < 0;

                return (
                  <div key={crop.id} className="rounded-2xl overflow-hidden shadow-lg">
                    {/* glassmorphic header */}
                    <div
                      className={`p-4 ${crop.category === "Grains" ? "bg-gradient-to-r from-amber-50 to-yellow-50" : crop.category === "Vegetables" ? "bg-gradient-to-r from-green-50 to-emerald-50" : crop.category === "Fruits" ? "bg-gradient-to-r from-rose-50 to-pink-50" : "bg-gradient-to-r from-teal-50 to-cyan-50"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">{crop.name}</h3>
                          <p className="text-xs text-slate-600">{crop.category}</p>
                        </div>
                        <div className={`p-2 rounded-full ${crop.trend === "up" ? "bg-emerald-600" : crop.trend === "down" ? "bg-rose-600" : "bg-slate-400"}`}>
                          {crop.trend === "up" ? <TrendingUp size={18} className="text-white" /> : crop.trend === "down" ? <TrendingDown size={18} className="text-white" /> : <Minus size={18} className="text-white" />}
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getVolatilityColor(crop.volatility)}`}>
                          {crop.volatility.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getDemandColor(crop.demand)}`}>
                          Demand: {crop.demand.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* glassmorphic body */}
                    <div className="p-6 bg-white/8 backdrop-blur-lg border-t border-white/10 border-b border-white/10">
                      <div className="mb-4">
                        <p className="text-sm text-emerald-200 mb-1">Current Price</p>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl md:text-3xl font-bold text-white">Rs {crop.currentPrice}</span>
                          <span className="text-sm text-emerald-200">{crop.unit}</span>
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg mb-4 ${isPositive ? "bg-green-50/60 border-l-4 border-emerald-400" : isNegative ? "bg-rose-50/60 border-l-4 border-rose-400" : "bg-slate-50/60 border-l-4 border-slate-300"}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-emerald-200 mb-1">
                              Change ({selectedTimeframe === "day" ? "24h" : selectedTimeframe === "week" ? "7d" : "30d"})
                            </p>
                            <p className={`text-2xl font-bold ${isPositive ? "text-emerald-500" : isNegative ? "text-rose-500" : "text-slate-700"}`}>
                              {isPositive ? "+" : ""}{change}%
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-emerald-200">Previous</p>
                            <p className="text-lg font-semibold text-white">Rs {comparisonPrice}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-emerald-200 mb-2">Price Movement</p>
                        <div className="flex items-end justify-between h-16 gap-2">
                          {[crop.monthAgo, crop.weekAgo, crop.previousPrice, crop.currentPrice].map((price, idx) => {
                            const maxPrice = Math.max(crop.monthAgo, crop.weekAgo, crop.previousPrice, crop.currentPrice);
                            const height = maxPrice ? (price / maxPrice) * 100 : 10;
                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center">
                                <div
                                  className={`w-full rounded-t transition-all ${idx === 3 ? "bg-gradient-to-t from-emerald-500 to-green-500" : "bg-slate-300"}`}
                                  style={{ height: `${height}%` }}
                                />
                                <p className="text-xs text-emerald-200 mt-1">
                                  {idx === 0 ? "30d" : idx === 1 ? "7d" : idx === 2 ? "1d" : "Now"}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-white/10 pt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-200">Quality:</span>
                          <span className="font-semibold text-white">{crop.quality}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-emerald-200 flex items-center">
                            <MapPin size={14} className="mr-1" />
                            Region:
                          </span>
                          <span className="font-semibold text-white">{crop.region}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // List / Table view (glassmorphic)
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Crop</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Current Price</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Change</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Trend</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Volatility</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Demand</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Region</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredData.map((crop) => {
                      const comparisonPrice = getComparisonPrice(crop);
                      const change = calculateChange(crop.currentPrice, comparisonPrice);
                      const isPositive = parseFloat(change) > 0;
                      const isNegative = parseFloat(change) < 0;

                      return (
                        <tr key={crop.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-white">{crop.name}</p>
                              <p className="text-xs text-emerald-200">{crop.quality}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${crop.category === "Grains" ? "bg-amber-100 text-amber-700" : crop.category === "Vegetables" ? "bg-emerald-100 text-emerald-700" : crop.category === "Fruits" ? "bg-rose-100 text-rose-700" : "bg-teal-100 text-teal-700"}`}>
                              {crop.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div>
                              <p className="font-bold text-white">Rs {crop.currentPrice}</p>
                              <p className="text-xs text-emerald-200">{crop.unit}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-bold ${isPositive ? "text-emerald-400" : isNegative ? "text-rose-400" : "text-emerald-200"}`}>
                              {isPositive ? "+" : ""}{change}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center">
                              {crop.trend === "up" ? <ArrowUp size={18} className="text-emerald-300" /> : crop.trend === "down" ? <ArrowDown size={18} className="text-rose-300" /> : <Minus size={18} className="text-emerald-200" />}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getVolatilityColor(crop.volatility)}`}>
                              {crop.volatility}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDemandColor(crop.demand)}`}>
                              {crop.demand}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-emerald-200">{crop.region}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredData.length === 0 && (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center mt-6">
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-emerald-200" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Crops Found</h3>
              <p className="text-emerald-200">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* bottom features */}
          <div className="mt-8 bg-white/8 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-white mb-1">Live Market Data</h4>
                <p className="text-sm text-emerald-200">Real-time price tracking for all crops</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-white mb-1">Trend Analysis</h4>
                <p className="text-sm text-emerald-200">Historical data and price predictions</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-white mb-1">Market Insights</h4>
                <p className="text-sm text-emerald-200">Volatility and demand indicators</p>
              </div>
            </div>
          </div>
        </main>

        {/* footer */}
        <footer className="text-emerald-200 text-sm py-8 text-center">
          © 2025 <span className="font-semibold text-white">Arz-e-Pak</span>. All rights reserved.
        </footer>
      </div>

      {/* small CSS for particle float animation (scoped) */}
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) translateY(-18px) rotate(8deg); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
