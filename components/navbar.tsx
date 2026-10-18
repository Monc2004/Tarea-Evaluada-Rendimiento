// components/Navbar.tsx
import Link from 'next/link';
import { cookies } from 'next/headers';
import { logoutAction } from '@/app/actions/auth';

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const isAuth = !!token;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/products" className="text-xl font-bold text-blue-600">
            D'Melara Store
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Productos
            </Link>

            {isAuth && (
              <Link
                href="/orders"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Mis Pedidos
              </Link>
            )}

            <Link
              href="/cart"
              className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center font-medium"
            >
              <span>🛒 Carrito</span>
            </Link>

            {!isAuth && (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm font-medium transition"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {isAuth && (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                >
                  Cerrar Sesión
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}