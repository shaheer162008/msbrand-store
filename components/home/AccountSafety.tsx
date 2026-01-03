'use client';

import React from 'react';

const AccountSafety: React.FC = () => {
  return (
    <div className="col-span-12 md:col-span-6 section-card flex items-center gap-8 lazy-element">
      <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
        <i className="fa-solid fa-user-gear text-4xl text-slate-400"></i>
      </div>
      <div>
        <h2 className="text-xl font-900 uppercase tracking-tight">Account Safety</h2>
        <p className="text-slate-500 text-sm font-medium">Manage your biometric login and payment methods.</p>
        <button className="mt-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition">
          Settings
        </button>
      </div>
    </div>
  );
};

export default AccountSafety;
