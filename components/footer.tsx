'use client'

import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 sm:pt-20 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-32 border-t-4 md:border-t-8" style={{ borderColor: '#FFD600' }}>
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 lg:gap-20 mb-12 sm:mb-16 md:mb-20 lg:mb-32">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="text-2xl sm:text-3xl md:text-4xl font-900 tracking-tighter uppercase mb-6 sm:mb-8 italic">
              MS BRAND <span style={{ color: '#FFD600' }}>STORE.</span>
            </div>
            <p className="text-slate-500 font-bold leading-relaxed max-w-sm text-sm sm:text-base">
              The world's most versatile marketplace. We deliver whatever you need, wherever you are.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button className="w-10 sm:w-12 h-10 sm:h-12 bg-zinc-900 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-brand hover:text-black transition cursor-pointer">
                <i className="fa-brands fa-facebook-f text-base sm:text-lg md:text-xl"></i>
              </button>
              <button className="w-10 sm:w-12 h-10 sm:h-12 bg-zinc-900 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-brand hover:text-black transition cursor-pointer">
                <i className="fa-brands fa-instagram text-base sm:text-lg md:text-xl"></i>
              </button>
              <button className="w-10 sm:w-12 h-10 sm:h-12 bg-zinc-900 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-brand hover:text-black transition cursor-pointer">
                <i className="fa-brands fa-whatsapp text-base sm:text-lg md:text-xl"></i>
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {/* Shopping */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600">Shopping</h5>
              <a href="#" className="text-xs sm:text-sm font-bold hover:text-brand transition">Daily Food</a>
              <a href="#" className="text-xs sm:text-sm font-bold hover:text-brand transition">Electronics</a>
              <a href="#" className="text-xs sm:text-sm font-bold hover:text-brand transition">Pharmacy</a>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600">Company</h5>
              <a href="#" className="text-xs sm:text-sm font-bold hover:text-brand transition">Become a Partner</a>
              <a href="#" className="text-xs sm:text-sm font-bold hover:text-brand transition">Careers</a>
              <a href="#" className="text-xs sm:text-sm font-bold hover:text-brand transition">Safety Hub</a>
            </div>

            {/* Download */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600">Download</h5>
              
              {/* iOS App */}
              <button className="bg-zinc-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white hover:text-black transition">
                <i className="fa-brands fa-apple text-lg sm:text-2xl flex-shrink-0"></i>
                <div className="text-left">
                  <p className="text-[7px] sm:text-[8px] font-black uppercase opacity-60">App Store</p>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase">iOS Mobile</p>
                </div>
              </button>

              {/* Android App */}
              <button className="bg-zinc-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-white hover:text-black transition">
                <i className="fa-brands fa-google-play text-lg sm:text-xl flex-shrink-0"></i>
                <div className="text-left">
                  <p className="text-[7px] sm:text-[8px] font-black uppercase opacity-60">Play Store</p>
                  <p className="text-[8px] sm:text-[10px] font-black uppercase">Android App</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 sm:pt-10 md:pt-12 border-t border-zinc-900 gap-6 sm:gap-8">
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700 text-center md:text-left">
            © 2025 MS BRAND STORE. ALL SYSTEM PROTOCOLS SECURE.
          </span>
          <div className="flex gap-6 sm:gap-10 md:gap-12 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-700">
            <a href="#" className="hover:text-brand transition">Privacy</a>
            <a href="#" className="hover:text-brand transition">Terms</a>
            <a href="#" className="hover:text-brand transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer