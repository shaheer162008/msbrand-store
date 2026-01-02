'use client';

import Link from 'next/link';

export default function WelcomeCTA() {
  return (
    <section className="w-full pt-24 pb-16">
      <h1 className="text-center text-5xl font-900 mb-8">Welcome to MS Brand Store.</h1>
      <center>
        <Link href="/signup">
          <button className="w-fit bg-brand text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase hover:opacity-90 transition">
            Create an Account For Free
          </button>
        </Link>
      </center>
    </section>
  );
}
