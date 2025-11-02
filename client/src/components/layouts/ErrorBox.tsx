import React from 'react';
import { AlertCircle, Wrench, Clock } from 'lucide-react';

const ServiceUnavailableBox = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
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
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
        {/* Icon Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 flex justify-center">
          <div className="bg-white rounded-full p-4">
            <Wrench className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Service Unavailable</h2>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            This service is currently in testing phase and may be temporarily unavailable. 
            We're working hard to bring it back online.
          </p>
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-6">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Testing Phase</span>
          </div>
          
          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">What's happening?</span>
              <br />
              We're performing maintenance and testing to improve your experience.
            </p>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default ServiceUnavailableBox;