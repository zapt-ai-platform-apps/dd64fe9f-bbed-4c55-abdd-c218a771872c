import React from 'react';

const StatsSection = () => (
  <div className="mt-20 text-center">
    <div className="card-glass p-8 backdrop-blur-lg border border-white/10">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="text-4xl font-bold text-primary">24/7</div>
          <div className="text-indigo-200">Availability</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-primary">99.9%</div>
          <div className="text-indigo-200">Uptime Reliability</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-primary">1M+</div>
          <div className="text-indigo-200">Client Connections</div>
        </div>
      </div>
    </div>
  </div>
);

export default StatsSection;