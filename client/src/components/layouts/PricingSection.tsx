import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Calendar, MapPin, DollarSign, Sprout, Sun } from 'lucide-react';

export default function PricingSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  
  const pricingData = [
  { "id": 1, "name": "Wheat", "category": "Grains", "currentPrice": 85, "previousPrice": 82, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 2, "name": "Rice (Basmati)", "category": "Grains", "currentPrice": 120, "previousPrice": 125, "unit": "per 40kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Premium" },
  { "id": 3, "name": "Sugarcane", "category": "Cash Crops", "currentPrice": 300, "previousPrice": 300, "unit": "per 40kg", "trend": "stable", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 4, "name": "Cotton", "category": "Cash Crops", "currentPrice": 8500, "previousPrice": 8300, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 5, "name": "Maize", "category": "Grains", "currentPrice": 65, "previousPrice": 65, "unit": "per 40kg", "trend": "stable", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Standard" },
  { "id": 6, "name": "Tomatoes", "category": "Vegetables", "currentPrice": 45, "previousPrice": 45, "unit": "per kg", "trend": "stable", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 7, "name": "Potatoes", "category": "Vegetables", "currentPrice": 35, "previousPrice": 32, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Grade A" },
  { "id": 8, "name": "Onions", "category": "Vegetables", "currentPrice": 55, "previousPrice": 60, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Grade A" },
  { "id": 9, "name": "Mangoes", "category": "Fruits", "currentPrice": 150, "previousPrice": 145, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Premium" },
  { "id": 10, "name": "Dates", "category": "Fruits", "currentPrice": 280, "previousPrice": 270, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Balochistan", "quality": "Premium" },
  { "id": 11, "name": "Chickpeas", "category": "Grains", "currentPrice": 120, "previousPrice": 118, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 12, "name": "Lentils", "category": "Grains", "currentPrice": 140, "previousPrice": 145, "unit": "per 40kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 13, "name": "Carrots", "category": "Vegetables", "currentPrice": 50, "previousPrice": 48, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 14, "name": "Cucumbers", "category": "Vegetables", "currentPrice": 40, "previousPrice": 42, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 15, "name": "Apples", "category": "Fruits", "currentPrice": 180, "previousPrice": 175, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Premium" },
  { "id": 16, "name": "Grapes", "category": "Fruits", "currentPrice": 200, "previousPrice": 205, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Premium" },
  { "id": 17, "name": "Barley", "category": "Grains", "currentPrice": 75, "previousPrice": 72, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Balochistan", "quality": "Grade B" },
  { "id": 18, "name": "Millet", "category": "Grains", "currentPrice": 90, "previousPrice": 90, "unit": "per 40kg", "trend": "stable", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Standard" },
  { "id": 19, "name": "Spinach", "category": "Vegetables", "currentPrice": 30, "previousPrice": 32, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Grade A" },
  { "id": 20, "name": "Peanuts", "category": "Cash Crops", "currentPrice": 250, "previousPrice": 245, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 21, "name": "Sunflower", "category": "Cash Crops", "currentPrice": 7000, "previousPrice": 6900, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 22, "name": "Mustard", "category": "Cash Crops", "currentPrice": 6800, "previousPrice": 6800, "unit": "per 40kg", "trend": "stable", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 23, "name": "Peas", "category": "Vegetables", "currentPrice": 60, "previousPrice": 58, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 24, "name": "Okra", "category": "Vegetables", "currentPrice": 55, "previousPrice": 53, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Grade A" },
  { "id": 25, "name": "Strawberries", "category": "Fruits", "currentPrice": 220, "previousPrice": 225, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Premium" },
  { "id": 26, "name": "Guava", "category": "Fruits", "currentPrice": 130, "previousPrice": 128, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 27, "name": "Pomegranate", "category": "Fruits", "currentPrice": 250, "previousPrice": 245, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Balochistan", "quality": "Premium" },
  { "id": 28, "name": "Cabbage", "category": "Vegetables", "currentPrice": 35, "previousPrice": 34, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 29, "name": "Cauliflower", "category": "Vegetables", "currentPrice": 40, "previousPrice": 42, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 30, "name": "Chilies", "category": "Vegetables", "currentPrice": 150, "previousPrice": 145, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Premium" },
  { "id": 31, "name": "Figs", "category": "Fruits", "currentPrice": 300, "previousPrice": 295, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Balochistan", "quality": "Premium" },
  { "id": 32, "name": "Walnuts", "category": "Fruits", "currentPrice": 800, "previousPrice": 780, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Premium" },
  { "id": 33, "name": "Almonds", "category": "Fruits", "currentPrice": 900, "previousPrice": 910, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Premium" },
  { "id": 34, "name": "Cherries", "category": "Fruits", "currentPrice": 700, "previousPrice": 680, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Premium" },
  { "id": 35, "name": "Peaches", "category": "Fruits", "currentPrice": 450, "previousPrice": 440, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Premium" },
  { "id": 36, "name": "Apricots", "category": "Fruits", "currentPrice": 350, "previousPrice": 340, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Premium" },
  { "id": 37, "name": "Plums", "category": "Fruits", "currentPrice": 400, "previousPrice": 395, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Premium" },
  { "id": 38, "name": "Barley Grass", "category": "Grains", "currentPrice": 70, "previousPrice": 68, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Standard" },
  { "id": 39, "name": "Chana Dal", "category": "Grains", "currentPrice": 130, "previousPrice": 128, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Grade A" },
  { "id": 40, "name": "Moong Dal", "category": "Grains", "currentPrice": 140, "previousPrice": 142, "unit": "per 40kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 41, "name": "Green Chilies", "category": "Vegetables", "currentPrice": 160, "previousPrice": 155, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Premium" },
  { "id": 42, "name": "Pumpkin", "category": "Vegetables", "currentPrice": 25, "previousPrice": 24, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 43, "name": "Bottle Gourd", "category": "Vegetables", "currentPrice": 30, "previousPrice": 32, "unit": "per kg", "trend": "down", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Standard" },
  { "id": 44, "name": "Watermelon", "category": "Fruits", "currentPrice": 80, "previousPrice": 78, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Grade A" },
  { "id": 45, "name": "Cantaloupe", "category": "Fruits", "currentPrice": 90, "previousPrice": 88, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Standard" },
  { "id": 46, "name": "Soybean", "category": "Cash Crops", "currentPrice": 9500, "previousPrice": 9400, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Grade A" },
  { "id": 47, "name": "Sesame", "category": "Cash Crops", "currentPrice": 7200, "previousPrice": 7150, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Sindh", "quality": "Standard" },
  { "id": 48, "name": "Garlic", "category": "Vegetables", "currentPrice": 200, "previousPrice": 195, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Premium" },
  { "id": 49, "name": "Ginger", "category": "Vegetables", "currentPrice": 350, "previousPrice": 340, "unit": "per kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "KPK", "quality": "Premium" },
  { "id": 50, "name": "Sugar Beet", "category": "Cash Crops", "currentPrice": 280, "previousPrice": 275, "unit": "per 40kg", "trend": "up", "lastUpdated": "2025-11-02", "region": "Punjab", "quality": "Standard" }
  ];

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Cash Crops'];

  const filteredData = pricingData
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-high') return b.currentPrice - a.currentPrice;
      if (sortBy === 'price-low') return a.currentPrice - b.currentPrice;
      return 0;
    });

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-emerald-800/50 to-green-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <header className="backdrop-blur-md bg-white/20 border-b border-white/30 shadow-lg sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-xl shadow-lg overflow-hidden">
                  <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />
                  <Sun className="absolute top-0.5 right-0.5 w-3 h-3 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Arz-e-Pak</h1>
                  <p className="text-xs sm:text-sm text-white/90 drop-shadow">Government Crop Pricing</p>
                </div>
              </div>
              <div className="backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-lg shadow-lg">
                <p className="text-xs text-white/90 font-medium">Last Updated</p>
                <p className="text-sm font-bold text-white">Nov 2, 2025</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="backdrop-blur-md bg-gradient-to-r from-green-600/40 to-emerald-600/40 border border-white/30 rounded-xl shadow-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-xl font-bold mb-2 text-white drop-shadow-lg">Official Government Pricing</h2>
                <p className="text-white/90 drop-shadow">All prices are regulated by the Government of Pakistan and updated daily</p>
              </div>
              <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg p-4 shadow-lg">
                <p className="text-sm font-semibold mb-1 text-white/90">Total Crops Listed</p>
                <p className="text-3xl font-bold text-white drop-shadow-lg">{pricingData.length}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-2xl p-4 sm:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-white placeholder-white/70"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none appearance-none text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-green-800">{cat}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none appearance-none text-white"
                >
                  <option value="name" className="bg-green-800">Sort by Name</option>
                  <option value="price-high" className="bg-green-800">Price: High to Low</option>
                  <option value="price-low" className="bg-green-800">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((crop) => (
              <div key={crop.id} className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-2xl hover:shadow-3xl hover:bg-white/25 transition-all duration-300 overflow-hidden">
                <div className={`p-4 backdrop-blur-sm ${
                  crop.category === 'Grains' ? 'bg-amber-500/30' :
                  crop.category === 'Vegetables' ? 'bg-green-500/30' :
                  crop.category === 'Fruits' ? 'bg-rose-500/30' :
                  'bg-teal-500/30'
                } border-b border-white/30`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white drop-shadow-lg">{crop.name}</h3>
                      <p className="text-xs text-white/90 drop-shadow">{crop.category}</p>
                    </div>
                    <div className={`p-2 rounded-full backdrop-blur-sm ${
                      crop.trend === 'up' ? 'bg-green-500/80' :
                      crop.trend === 'down' ? 'bg-red-500/80' :
                      'bg-gray-400/80'
                    } shadow-lg`}>
                      {crop.trend === 'up' ? (
                        <TrendingUp size={20} className="text-white" />
                      ) : crop.trend === 'down' ? (
                        <TrendingDown size={20} className="text-white" />
                      ) : (
                        <div className="w-5 h-5 bg-white/80 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-white/80 mb-1 drop-shadow">Current Price</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-white drop-shadow-lg">Rs {crop.currentPrice}</span>
                      <span className="text-sm text-white/80 drop-shadow">{crop.unit}</span>
                    </div>
                  </div>

                  {crop.trend !== 'stable' && (
                    <div className={`flex items-center space-x-2 mb-4 p-3 rounded-lg backdrop-blur-sm ${
                      crop.trend === 'up' ? 'bg-green-500/30' : 'bg-red-500/30'
                    } border border-white/30 shadow-lg`}>
                      <span className={`text-sm font-semibold ${
                        crop.trend === 'up' ? 'text-white' : 'text-white'
                      } drop-shadow`}>
                        {crop.trend === 'up' ? '+' : ''}{calculateChange(crop.currentPrice, crop.previousPrice)}%
                      </span>
                      <span className="text-xs text-white/90 drop-shadow">from previous rate</span>
                    </div>
                  )}

                  <div className="space-y-2 border-t border-white/30 pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80 drop-shadow">Quality:</span>
                      <span className="font-semibold text-white drop-shadow">{crop.quality}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80 flex items-center drop-shadow">
                        <MapPin size={14} className="mr-1" />
                        Region:
                      </span>
                      <span className="font-semibold text-white drop-shadow">{crop.region}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80 flex items-center drop-shadow">
                        <Calendar size={14} className="mr-1" />
                        Updated:
                      </span>
                      <span className="font-semibold text-white drop-shadow">
                        {new Date(crop.lastUpdated).toLocaleDateString('en-PK')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-2xl p-12 text-center">
              <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">No Crops Found</h3>
              <p className="text-white/90 drop-shadow">Try adjusting your search or filter criteria</p>
            </div>
          )}
           
          <div className="mt-8 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 backdrop-blur-sm bg-green-500/30 border border-white/30 rounded-lg shadow-lg">
                <div className="bg-green-600/80 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <DollarSign className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-white mb-1 drop-shadow-lg">Government Regulated</h4>
                <p className="text-sm text-white/90 drop-shadow">All prices are official and government-approved</p>
              </div>
              <div className="text-center p-4 backdrop-blur-sm bg-emerald-500/30 border border-white/30 rounded-lg shadow-lg">
                <div className="bg-emerald-600/80 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Calendar className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-white mb-1 drop-shadow-lg">Daily Updates</h4>
                <p className="text-sm text-white/90 drop-shadow">Prices updated every day for accuracy</p>
              </div>
              <div className="text-center p-4 backdrop-blur-sm bg-teal-500/30 border border-white/30 rounded-lg shadow-lg">
                <div className="bg-teal-600/80 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-white mb-1 drop-shadow-lg">Regional Pricing</h4>
                <p className="text-sm text-white/90 drop-shadow">Prices vary by region across Pakistan</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}