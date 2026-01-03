'use client';

import React from 'react';

const MonthlyInsights: React.FC = () => {
  return (
    <div className="col-span-12 md:col-span-4 section-card lazy-element">
      <div className="icon-box bg-slate-100 text-slate-600">
        <i className="fa-solid fa-chart-pie"></i>
      </div>
      <h2 className="text-2xl font-900 uppercase tracking-tight">Monthly Insights</h2>
      <div className="mt-4 flex items-end gap-2">
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-yellow-400 h-full" style={{ width: '65%' }}></div>
        </div>
        <span className="text-xs font-black">65%</span>
      </div>
      <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest">Efficiency Score: High</p>
    </div>
  );
};

export default MonthlyInsights;
