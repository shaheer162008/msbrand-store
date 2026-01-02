'use client';

import Link from 'next/link';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function ServiceCard({ image, title, description, buttonText, href }: ServiceCardProps) {
  return (
    <div className="relative h-[450px] rounded-[3rem] overflow-hidden group cursor-pointer border-4 border-white shadow-2xl">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
        <h3 className="text-white text-4xl font-black uppercase mb-4 tracking-tighter">{title}</h3>
        <p className="text-white/60 font-bold mb-6">{description}</p>
        <Link href={href}>
          <button className="w-fit bg-brand text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase hover:opacity-90 transition">
            {buttonText} <i className="fa-solid fa-arrow-right ml-2"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
