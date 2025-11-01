import React, { useState } from 'react';
import { Sprout, TrendingUp, Droplets, Users, Package, BookOpen, BarChart3, AlertCircle, Leaf, DollarSign, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { icon: TrendingUp, label: 'Crop Yield', value: '+18%', subtext: 'vs last season', color: 'bg-emerald-100 text-emerald-700' },
    { icon: Droplets, label: 'Water Saved', value: '2,450 L', subtext: 'this month', color: 'bg-teal-100 text-teal-700' },
    { icon: DollarSign, label: 'Revenue', value: 'Rs 85,000', subtext: '+12% increase', color: 'bg-green-100 text-green-700' },
    { icon: Users, label: 'Market Buyers', value: '23', subtext: '5 new this week', color: 'bg-lime-100 text-lime-700' }
  ];

  const alerts = [
    { type: 'warning', message: 'Optimal time for wheat irrigation: Next 48 hours', time: '2 hours ago' },
    { type: 'info', message: 'New buyer interested in your organic tomatoes', time: '5 hours ago' },
    { type: 'success', message: 'Training session on drip irrigation available', time: '1 day ago' }
  ];

  const resources = [
    { label: 'Water Usage', value: 65, color: 'bg-cyan-500' },
    { label: 'Fertilizer Stock', value: 42, color: 'bg-emerald-500' },
    { label: 'Seeds Inventory', value: 78, color: 'bg-lime-500' }
  ];

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: Sprout, label: 'My Crops', active: false },
    { icon: Package, label: 'Marketplace', active: false },
    { icon: Droplets, label: 'Resources', active: false },
    { icon: BookOpen, label: 'Training', active: false },
    { icon: Users, label: 'Community', active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">FarmConnect</h2>
                <p className="text-xs text-green-600">BUILD4BETTER</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                item.active 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-100">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-lg">
            <p className="text-sm font-semibold text-green-800 mb-1">Need Help?</p>
            <p className="text-xs text-green-700">Contact support 24/7</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden bg-green-100 p-2 rounded-lg"
                >
                  <Menu size={24} className="text-green-700" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Welcome back, Ahmed!</h1>
                  <p className="text-sm text-gray-600">Here's what's happening with your farm today</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <p className="text-xs text-green-700 font-medium">Last Updated</p>
                  <p className="text-sm font-bold text-green-800">Nov 1, 2025 - 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-xs text-gray-500">{stat.subtext}</span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Alerts Section */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <AlertCircle className="mr-2 text-green-600" size={24} />
                  Smart Alerts & Recommendations
                </h2>
              </div>
              <div className="space-y-4">
                {alerts.map((alert, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'bg-amber-50 border-amber-500' :
                    alert.type === 'success' ? 'bg-green-50 border-green-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Management */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Droplets className="mr-2 text-green-600" size={24} />
                Resources
              </h2>
              <div className="space-y-6">
                {resources.map((resource, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{resource.label}</span>
                      <span className="text-sm font-bold text-gray-800">{resource.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${resource.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${resource.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market & Training Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Market Access */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Package className="mr-2" size={24} />
                  Marketplace
                </h2>
              </div>
              <p className="mb-6 text-green-100">Connect directly with buyers and get better prices for your crops</p>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold">Active Listings</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <button className="w-full bg-white text-green-600 font-semibold py-3 rounded-lg hover:bg-green-50 transition-colors">
                  View All Listings
                </button>
              </div>
            </div>

            {/* Training */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <BookOpen className="mr-2" size={24} />
                  Training Hub
                </h2>
              </div>
              <p className="mb-6 text-teal-100">Learn modern farming techniques and sustainable practices</p>
              <div className="space-y-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold">Courses Available</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <button className="w-full bg-white text-teal-600 font-semibold py-3 rounded-lg hover:bg-teal-50 transition-colors">
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}