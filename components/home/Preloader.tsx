'use client';

import React, { useEffect } from 'react';

interface PreloaderProps {
  duration?: number;
  hideImmediately?: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ duration = 600, hideImmediately = false }) => {
  const [isHidden, setIsHidden] = React.useState(hideImmediately);

  useEffect(() => {
    if (hideImmediately) {
      setIsHidden(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsHidden(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, hideImmediately]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center z-[9999] transition-all duration-500 ${
        isHidden ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible pointer-events-auto'
      }`}
    >
      <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6 animate-pulse overflow-hidden">
        <img src="/logo.jpeg" alt="MS Brand Store" className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="text-2xl font-900 uppercase tracking-tighter mb-4">MS Brand Store</div>
      <div className="w-36 h-1 bg-slate-100 rounded-full overflow-hidden relative">
        <div className="w-full h-full bg-yellow-400 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default Preloader;
