// app/products/page.tsx
import { Product } from '@/types';
import Link from 'next/link';

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los productos desde la API');
  }

  const json = await res.json();
  
  // Extraemos el arreglo 'data' anidado que devuelve Laravel
  if (json.data && Array.isArray(json.data.data)) {
    return json.data.data;
  }
  
  if (Array.isArray(json.data)) {
    return json.data;
  }

  if (Array.isArray(json)) {
    return json;
  }

  return [];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Catálogo de Productos</h1>
      
      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
              <div>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <span className="text-lg font-bold text-blue-600">${Number(product.price).toFixed(2)}</span>
              </div>
              <Link
                href={`/products/${product.id}`}
                className="mt-6 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
              >
                Ver Detalle
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}