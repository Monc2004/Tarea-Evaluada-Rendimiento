// app/products/error.tsx
'use client';

import { useEffect } from 'react';

export default function ErrorProducts({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-red-200 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">¡Ocurrió un error!</h2>
      <p className="text-gray-600 mb-6">No pudimos conectar con el servidor para cargar el catálogo de productos.</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}