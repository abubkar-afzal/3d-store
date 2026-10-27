import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { api } from '@/lib/api';
import { formatPrice } from '@/utils/formatPrice';
import Spinner from '@/components/ui/Spinner';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/products')
      .then((d) => setProducts(d.products || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-r from-brand-600 to-brand-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">Design your product in 3D</h1>
          <p className="text-xl text-brand-50 mb-8 max-w-2xl">
            Customize colors, materials, and parts in real-time. Powered by Babylon.js and AI.
          </p>
          <Link href="#products" className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Browse products →
          </Link>
        </div>
      </section>

      <section id="products" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">All products</h2>
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : products.length === 0 ? (
          <p className="text-gray-500">
            No products yet. Log in as admin and add one at <code>/admin/products</code>, or run <code>npm run seed</code>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p._id} href={`/configurator/${p._id}`}
                className="bg-white rounded-2xl border hover:shadow-lg transition p-5 block">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-600 font-bold">{formatPrice(p.basePrice)}</span>
                  <span className="text-xs text-gray-400">{p.category}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}