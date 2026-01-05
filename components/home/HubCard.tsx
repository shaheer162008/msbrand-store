'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HubCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
  buttonType?: 'primary' | 'secondary' | 'default';
  layout?: 'full' | 'half';
  image?: string;
}

const HubCard: React.FC<HubCardProps> = ({
  icon,
  title,
  description,
  href,
  buttonText,
  buttonType = 'default',
  layout = 'half',
  image,
}) => {
  const colSpanClass = layout === 'full' ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4';
  const iconBgColor = {
    food: 'bg-orange-100 text-orange-600',
    pharmacy: 'bg-blue-100 text-blue-600',
    grocery: 'bg-green-100 text-green-600',
  }[title.toLowerCase().split(' ')[0]] || 'bg-slate-100 text-slate-600';

  const buttonStyle = {
    primary: 'bg-black text-white px-8 py-3 rounded-xl font-bold text-sm transition hover:bg-slate-800',
    secondary: 'px-8 py-3 rounded-xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition',
    default: 'text-sm font-bold border-b-2 border-yellow-400 pb-1 hover:text-slate-600 transition',
  };

  return (
    <div className={`${colSpanClass} section-card border-2 border-yellow-400 rounded-lg bg-white p-6 flex flex-col justify-between group lazy-element hover:shadow-lg transition-all`}>
      {image && (
        <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      )}
      <div>
        <div className={`icon-box inline-block p-3 rounded-lg mb-3 ${iconBgColor}`}>
          <i className={`fa-solid fa-${icon} text-xl`}></i>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-black">{title}</h2>
        <p className="text-slate-600 mt-2 font-medium">{description}</p>
      </div>
      {layout === 'full' ? (
        <div className="mt-8 flex gap-4">
          <Link href={href}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold text-sm transition">{buttonText}</button>
          </Link>
          <button className="px-8 py-3 rounded-lg font-bold text-sm border-2 border-yellow-400 text-black hover:bg-yellow-50 transition">View Menu</button>
        </div>
      ) : (
        <Link href={href}>
          <button className="mt-6 inline-block text-sm font-bold text-yellow-500 hover:text-yellow-600 border-b-2 border-yellow-400 pb-1">{buttonText}</button>
        </Link>
      )}
    </div>
  );
};

export default HubCard;
