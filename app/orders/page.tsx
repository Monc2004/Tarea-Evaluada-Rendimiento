// app/orders/page.tsx
import { getUserOrders } from '@/app/actions/orders';
import Link from 'next/link';

export default async function OrdersPage() {
  const { orders, error } = await getUserOrders();

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Historial de Compras</h1>
        <p className="text-red-500 mb-6">{error}</p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Mis Pedidos</h1>

      {(!orders || orders.length === 0) ? (
        <div className="bg-white border rounded-lg p-8 text-center shadow-sm">
          <p className="text-gray-600 mb-4">Aún no has realizado ninguna compra.</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <div>
                  <span className="text-sm font-semibold text-gray-500">Orden #{order.id}</span>
                  <p className="text-xs text-gray-400">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'Fecha reciente'}
                  </p>
                </div>
                <div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {order.status || 'Completado'}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-100 mb-4">
                {order.items?.map((item: any) => (
                  <div key={item.id || item.product_id} className="py-2 flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product?.name || `Producto ID: ${item.product_id}`} x {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(Number(item.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between items-center font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-blue-600 text-lg">${Number(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}