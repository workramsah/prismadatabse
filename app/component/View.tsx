"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number | null;
};

export default function View() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("/api/data");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Products</h2>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  {p.price === null ? "-" : p.price}
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr className="border-t">
                <td className="p-3 text-gray-600" colSpan={3}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}