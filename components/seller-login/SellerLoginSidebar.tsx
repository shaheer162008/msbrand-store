'use client';

export default function SellerLoginSidebar() {
  return (
    <div className="hidden lg:flex w-1/2 bg-black p-20 flex-col justify-between text-white relative overflow-hidden min-h-screen">
      {/* Gradient blur circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

      {/* Logo */}
      <div className="relative z-10">
        <div className="text-2xl font-bold tracking-tighter uppercase italic">
          MS <span style={{ color: '#FFD600' }}>BRAND STORE.</span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10">
        <h2 className="text-5xl font-bold leading-tight mb-6">
          Manage your business <br />
          <span style={{ color: '#FFD600' }}>from anywhere.</span>
        </h2>
        <div className="flex gap-10 mt-12">
          <div>
            <p className="text-brand text-2xl font-bold" style={{ color: '#FFD600' }}>
              2.4M+
            </p>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
              Active Buyers
            </p>
          </div>
          <div>
            <p className="text-brand text-2xl font-bold" style={{ color: '#FFD600' }}>
              180+
            </p>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
              Global Regions
            </p>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="text-zinc-600 text-xs font-medium">Merchant Protocol v4.2 Secure</div>
    </div>
  );
}
