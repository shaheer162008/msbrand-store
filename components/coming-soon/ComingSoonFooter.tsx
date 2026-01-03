'use client';

export default function ComingSoonFooter() {
  return (
    <footer className="py-12 px-8 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-medium text-slate-600">
          © 2025 MS Brand Store. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-black transition">
            Privacy Policy
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-black transition">
            Terms of Service
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-black transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
