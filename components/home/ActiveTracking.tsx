'use client';

import React from 'react';

const ActiveTracking: React.FC = () => {
  return (
    <div className="col-span-12 md:col-span-4 section-card bg-yellow-400 border-none lazy-element">
      <div className="icon-box bg-black text-yellow-400">
        <i className="fa-solid fa-truck-fast"></i>
      </div>
      <h2 className="text-2xl font-900 uppercase tracking-tight">Active Tracking</h2>
      <p className="text-black font-bold mt-2">1 Order currently in transit</p>
      <div className="mt-6 bg-white/50 p-4 rounded-xl">
        <p className="text-[10px] font-black uppercase">Estimated Arrival</p>
        <p className="text-xl font-900">12:45 PM</p>
      </div>
    </div>
  );
};

export default ActiveTracking;
