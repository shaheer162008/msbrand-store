'use client';

import { useEffect, useState } from 'react';

interface PreloaderProps {
  duration?: number;
  text?: string;
}

export default function Preloader({ duration = 600, text = 'Processing' }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-500">
      <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black shadow-lg" style={{ backgroundColor: '#FFD600' }}>
        MS
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{text}</p>
    </div>
  );
}
