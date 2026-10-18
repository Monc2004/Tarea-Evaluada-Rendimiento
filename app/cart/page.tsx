// app/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { createOrderAction } from '@/app/actions/orders';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    const items = cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const res = await createOrderAction(items);

    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    clearCart();
    alert('¡Orden realizada con éxito!');
    router.push('/orders');
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Tu Carrito está Vacío</h1>
        <p className="text-gray-600 mb-8">Agrega algunos productos desde nuestro catálogo para comenzar.</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Ir al Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Carrito de Compras</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span>{error}</span>
          {error.includes('iniciar sesión') && (
            <div className="flex space-x-3 shrink-0">
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-700 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-300 transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.product.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {item.product.image_url && (
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity} x ${Number(item.product.price).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <span className="font-bold text-gray-800">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 mt-6 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-extrabold text-blue-600">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-gray-500 hover:text-gray-700 font-medium text-sm"
        >
          Vaciar Carrito
        </button>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-bold disabled:opacity-50"
        >
          {loading ? 'Procesando Pedido...' : 'Finalizar Compra'}
        </button>
      </div>
    </main>
  );
}