'use client';

import Link from 'next/link';

export default function WelcomeCTA() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-900 mb-4 sm:mb-6 px-4">Welcome to MS Brand Store.</h1>
      <div className="flex justify-center px-4">
        <Link href="/signup">
          <button className="w-fit bg-brand text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-black text-[8px] sm:text-[9px] lg:text-[10px] uppercase hover:opacity-90 transition">
            Create an Account For Free
          </button>
        </Link>
      </div>
    </section>
  );
}
