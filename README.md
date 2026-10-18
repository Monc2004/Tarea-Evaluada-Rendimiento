# D'Melara Store - Frontend E-commerce (Next.js & Laravel 12)

Aplicación web frontend desarrollada en **Next.js 16+ (App Router)** y **TypeScript**, diseñada para consumir de forma segura y eficiente la API REST de un sistema de comercio electrónico (respaldado por **Laravel 12** y **Stripe**).

---

## 📋 Stack Tecnológico
* **Framework:** Next.js 16+ (App Router) con Server Components y Server Actions.
* **Lenguaje:** TypeScript.
* **Estilos:** Tailwind CSS.
* **Autenticación:** Gestión de tokens mediante cookies `httpOnly` seguras.
* **Pasarela de Pagos:** Integración con Stripe SDK.

---

## ⚙️ Funcionalidades Obligatorias Implementadas

1. **Catálogo Público:**
   * Listado general de productos públicos consumidos desde la API.
   * Vista de detalle de producto optimizada.
2. **Autenticación Segura:**
   * Módulos de Registro y Login conectados a los endpoints de la API de Laravel.
   * Protección de rutas y almacenamiento de tokens mediante cookies `httpOnly`.
3. **Carrito y Órdenes:**
   * Gestión de estado local para agregar o retirar productos del carrito de compras.
   * Creación de órdenes en la API mediante Server Actions seguras.
4. **Pasarela de Pagos (Stripe):**
   * Envío del flujo de pago con el método correspondiente (`payment_method_id`).
   * Alertas y confirmaciones de compra exitosa.
5. **Historial de Compras:**
   * Vista protegida (`/orders`) para listar y auditar las órdenes realizadas por el usuario autenticado.

---

## ⚡ Rendimiento y Resiliencia
* **Optimización en el Servidor:** Lecturas eficientes mediante Server Components (`async/await` directo a la API).
* **Mutaciones Seguras:** Uso de Server Actions para mantener el estado sincronizado con `revalidatePath` y `router.refresh()`.
* **Manejo de Errores:** Estructuras preparadas para capturar fallos de red y respuestas no autorizadas.

---

## 🚀 Instalación y Ejecución Local

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
   cd tu-repositorio

   ## 🛠️ Configuración de Variables de Entorno (`.env.example`)

Para conectar la aplicación con la API backend, crea un archivo `.env.local` basado en el siguiente ejemplo:

```env
# URL Base de la API REST (Laravel)
NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
