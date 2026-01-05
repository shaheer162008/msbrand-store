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
    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-lg overflow-hidden group cursor-pointer border-2 border-yellow-400 shadow-lg hover:shadow-2xl transition-all">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-end">
        <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-2 sm:mb-3 lg:mb-4 tracking-tight">{title}</h3>
        <p className="text-white/70 font-bold mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm md:text-base">{description}</p>
        <Link href={href}>
          <button className="w-fit bg-yellow-400 hover:bg-yellow-500 text-black px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-black text-xs sm:text-sm uppercase transition">
            {buttonText} <i className="fa-solid fa-arrow-right ml-1 sm:ml-2"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
