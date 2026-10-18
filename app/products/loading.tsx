// app/products/loading.tsx
export default function LoadingProducts() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="border p-4 rounded-lg shadow space-y-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-full mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}