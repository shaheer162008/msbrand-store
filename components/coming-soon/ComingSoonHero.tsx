'use client';

export default function ComingSoonHero() {
  return (
    <main className="flex-grow flex items-center justify-center px-4 relative overflow-hidden py-20">
      {/* Gradient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none" 
           style={{ backgroundColor: 'rgba(255, 214, 0, 0.1)' }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none"
           style={{ backgroundColor: 'rgba(255, 214, 0, 0.2)' }}></div>

      {/* Content */}
      <div className="max-w-[600px] text-center relative z-10">
        <div className="mb-8">
          <div className="text-5xl font-bold tracking-tighter mb-4">
            Something <span style={{ color: '#FFD600' }}>Amazing</span> is Coming
          </div>
          <p className="text-slate-500 text-lg font-medium">
            We're building the ultimate shopping experience. Be the first to know when we launch.
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:border-slate-300 focus:bg-white transition-all text-sm font-medium"
          />
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all"
          >
            Notify Me
          </button>
        </form>

        <p className="text-slate-400 text-xs">No spam. Just pure updates.</p>
      </div>
    </main>
  );
}
