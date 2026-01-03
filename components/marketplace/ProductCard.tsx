'use client';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  onAddToCart?: () => void;
  onPreview?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  onAddToCart,
  onPreview,
}: ProductCardProps) {
  return (
    <div
      className="group bg-white p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] border-2 cursor-pointer transition-all hover:shadow-lg"
      style={{ borderColor: '#f8fafc' }}
      onClick={onPreview}
    >
      {/* Image */}
      <div className="aspect-square rounded-lg sm:rounded-xl lg:rounded-[2rem] overflow-hidden mb-3 sm:mb-4 lg:mb-6 bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div>
        {category && (
          <p className="text-[7px] sm:text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 sm:mb-2">
            {category}
          </p>
        )}
        <h3 className="text-sm sm:text-base lg:text-xl font-black uppercase tracking-tight line-clamp-2 mb-2 sm:mb-3 lg:mb-4">
          {name}
        </h3>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg sm:text-xl lg:text-2xl font-black leading-none">${price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="w-9 sm:w-10 lg:w-12 h-9 sm:h-10 lg:h-12 bg-black rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center transition-all hover:shadow-lg active:scale-95 flex-shrink-0"
            style={{ color: '#FFD600' }}
          >
            <i className="fa-solid fa-plus text-xs sm:text-sm lg:text-base"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
