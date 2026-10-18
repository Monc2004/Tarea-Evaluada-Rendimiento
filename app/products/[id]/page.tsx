// app/products/[id]/page.tsx
import { Product } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Error HTTP: ${res.status} al buscar producto ID ${id}`);
      return null;
    }

    const json = await res.json();
    console.log('Respuesta de la API para producto individual:', json); // <-- Mira esto en tu terminal

    return json.data || json.product || json;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  // Manejo seguro de params para versiones recientes de Next.js
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
        &larr; Volver al catálogo
      </Link>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-72 object-cover rounded-lg"
            />
          ) : (
            <div className="bg-gray-100 h-72 rounded flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${Number(product.price).toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-6">Stock disponible: {product.stock} unidades</p>
          </div>
          
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}