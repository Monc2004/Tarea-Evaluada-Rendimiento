// app/actions/auth.ts
'use server';

// app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Credenciales incorrectas' };
    }

    const token = data.token || data.access_token || data.data?.token;

    if (!token) {
      return { error: 'No se recibió el token de autenticación' };
    }

    // Guardar cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

  } catch (e) {
    return { error: 'Error al conectar con el servidor' };
  }

  // Redirigir a productos después de iniciar sesión
  redirect('/products');
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const password_confirmation = formData.get('password_confirmation');

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Error al registrarse' };
    }

    const token = data.token || data.access_token;
    if (token) {
      const cookieStore = await cookies(); // <-- Agregado await aquí
      cookieStore.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  } catch (err) {
    return { error: 'Error de conexión con el servidor' };
  }

  redirect('/products');
}

// Agrega esto a tu archivo app/actions/auth.ts existente

export async function checkAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return !!token;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}