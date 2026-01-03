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
    <div className={`${colSpanClass} section-card flex flex-col justify-between group lazy-element`}>
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
        <div className={`icon-box ${iconBgColor}`}>
          <i className={`fa-solid fa-${icon}`}></i>
        </div>
        <h2 className="text-2xl font-900 uppercase tracking-tight">{title}</h2>
        <p className="text-slate-500 mt-2 font-medium">{description}</p>
      </div>
      {layout === 'full' ? (
        <div className="mt-8 flex gap-4">
          <Link href={href}>
            <button className={buttonStyle[buttonType]}>{buttonText}</button>
          </Link>
          <button className={buttonStyle.secondary}>View Menu</button>
        </div>
      ) : (
        <Link href={href}>
          <button className={`mt-6 inline-block ${buttonStyle.default}`}>{buttonText}</button>
        </Link>
      )}
    </div>
  );
};

export default HubCard;
