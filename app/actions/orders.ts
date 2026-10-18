// app/actions/orders.ts
'use server';

import { cookies } from 'next/headers';

export async function createOrderAction(items: { product_id: number; quantity: number }[]) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { error: 'Debes iniciar sesión para realizar un pedido.' };
    }

    const payload = {
      items: items,
      products: items.map(item => ({ id: item.product_id, quantity: item.quantity })),
      payment_method_id: 'pm_card_visa',
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.errors) {
        const firstErrorKey = Object.keys(data.errors)[0];
        return { error: data.errors[firstErrorKey][0] };
      }
      return { error: data.message || 'Error al procesar la orden' };
    }

    return { success: true, order: data };
  } catch (err) {
    return { error: 'Error de conexión al procesar el pedido.' };
  }
}

export async function getUserOrders() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { error: 'Debes iniciar sesión para ver tus pedidos.' };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return { error: 'No se pudieron obtener los pedidos.' };
    }

    const data = await res.json();
    
    // Imprimimos la respuesta exacta de la API en la terminal de VS Code
    console.log('--- RESPUESTA DE LARAVEL GET /orders ---', JSON.stringify(data, null, 2));

    // Extraemos el arreglo probando todas las estructuras típicas de Laravel
    let ordersList: any[] = [];

    if (Array.isArray(data)) {
      ordersList = data;
    } else if (Array.isArray(data.data)) {
      ordersList = data.data;
    } else if (data.data && Array.isArray(data.data.data)) { // Paginación de Laravel (LengthAwarePaginator)
      ordersList = data.data.data;
    } else if (data.orders && Array.isArray(data.orders)) {
      ordersList = data.orders;
    }

    return { orders: ordersList };
  } catch (err) {
    return { error: 'Error al conectar con el servidor.' };
  }
}