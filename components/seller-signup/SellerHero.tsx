'use client';

export default function SellerHero() {
  return (
    <div className="lg:w-1/2">
      <h1 className="text-6xl font-bold tracking-tighter leading-[0.9] mb-8">
        Open your shop to <br />
        <span
          className="bg-black px-4 inline-block -rotate-1"
          style={{ color: '#FFD600' }}
        >
          millions.
        </span>
      </h1>
      <p className="text-slate-500 text-lg font-medium mb-12">
        Whether you sell electronics, groceries, or handmade crafts, MS Brand Store provides the tools you need to scale globally.
      </p>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-3xl font-bold text-black mb-1">0%</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Listing Fees</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-black mb-1">24h</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support Response</p>
        </div>
      </div>
    </div>
  );
}
