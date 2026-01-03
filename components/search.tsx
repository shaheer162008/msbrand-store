'use client';

export default function Search() {
  return (
    <div className="w-full">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-50 border-2 border-slate-100 pl-3 sm:pl-5 md:pl-6 pr-11 sm:pr-16 md:pr-20 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg md:rounded-2xl font-bold text-[7px] sm:text-[8px] md:text-xs uppercase tracking-widest outline-none focus:border-slate-300 transition-all"
        />
        <button 
          type="button"
          className="absolute right-1 sm:right-1.5 md:right-2 bg-black rounded-md sm:rounded-lg md:rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
          style={{ 
            width: '32px',
            height: '32px',
            color: '#FFD600'
          }}
        >
          <i className="fa-solid fa-magnifying-glass text-xs sm:text-sm md:text-base"></i>
        </button>
      </div>
    </div>
  );
}
