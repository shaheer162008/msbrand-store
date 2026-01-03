'use client';

import { useState } from 'react';

export default function SellerForm() {
  const [selectedVolume, setSelectedVolume] = useState('50+');

  return (
    <div className="lg:w-1/2 w-full">
      <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-50">
        <h3 className="text-xl font-bold mb-6">Business Details</h3>

        <form className="space-y-4">
          {/* Business Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Legal Business Name
            </label>
            <input
              type="text"
              placeholder="Empire Retail Ltd"
              className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium"
              style={{ borderColor: 'transparent' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            />
          </div>

          {/* Store Category */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Store Category
            </label>
            <select
              className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium"
              style={{ borderColor: 'transparent' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            >
              <option>Electronics & Tech</option>
              <option>Fashion & Apparel</option>
              <option>Home & Groceries</option>
              <option>Health & Pharmacy</option>
            </select>
          </div>

          {/* Business Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Business Email
            </label>
            <input
              type="email"
              placeholder="sales@yourbrand.com"
              className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium"
              style={{ borderColor: 'transparent' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            />
          </div>

          {/* Average Monthly Volume */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Average Monthly Volume
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedVolume('1-50')}
                className="flex-1 py-3 rounded-xl border-2 font-bold text-xs transition hover:border-brand"
                style={selectedVolume === '1-50' ? { borderColor: '#FFD600' } : { borderColor: '#e2e8f0' }}
              >
                1-50 orders
              </button>
              <button
                type="button"
                onClick={() => setSelectedVolume('50+')}
                className="flex-1 py-3 rounded-xl border-2 font-bold text-xs transition hover:border-brand"
                style={selectedVolume === '50+' ? { borderColor: '#FFD600', backgroundColor: '#FFD600' } : { borderColor: '#e2e8f0' }}
              >
                50+ orders
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black py-5 rounded-2xl font-bold text-sm shadow-xl hover:bg-zinc-800 transition-all mt-6 flex items-center justify-center gap-2"
            style={{ color: '#FFD600' }}
          >
            Register My Store <i className="fa-solid fa-shop"></i>
          </button>
        </form>

        <p className="text-[10px] text-center text-slate-400 mt-6 font-medium">
          By registering, you agree to the MS Seller Merchant Agreement.
        </p>
      </div>
    </div>
  );
}
