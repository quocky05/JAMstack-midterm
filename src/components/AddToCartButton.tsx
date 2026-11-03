import React from 'react';
import { addToCart } from '../stores/cartStore';

interface Props {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  variant?: 'primary' | 'secondary' | 'large';
}

export default function AddToCartButton({ product, variant = 'primary' }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  if (variant === 'large') {
    return (
      <button
        onClick={handleClick}
        className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span>Thêm vào giỏ hàng</span>
        <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded font-mono">Island JS</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="p-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl transition-all duration-150 flex items-center justify-center group/btn border border-emerald-200"
      title="Thêm vào giỏ hàng"
      aria-label="Thêm vào giỏ"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}
