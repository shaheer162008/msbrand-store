'use client';

export default function Search() {
  return (
    <div className="hidden lg:flex flex-grow max-w-xl">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          placeholder="Search for Food, Rides, or Groceries..."
          className="w-full bg-slate-50 border-2 border-slate-100 pl-6 pr-20 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest outline-none focus:border-slate-300 transition-all"
        />
        <button 
          type="button"
          className="absolute right-2 bg-black rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
          style={{ 
            width: '44px', 
            height: '44px',
            color: '#FFD600'
          }}
        >
          <i className="fa-solid fa-magnifying-glass text-lg"></i>
        </button>
      </div>
    </div>
  );
}
