// app/products/[id]/AddToCartButton.tsx
'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3 rounded-lg font-semibold transition text-white ${
        added ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {added ? '¡Agregado al Carrito! ✓' : 'Agregar al Carrito'}
    </button>
  );
}