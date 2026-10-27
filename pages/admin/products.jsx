import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Button from '@/components/ui/Button';
import ProductForm from '@/components/admin/ProductForm';
import { api } from '@/lib/api';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const refresh = () => api.get('/api/products').then((d) => setProducts(d.products));
  useEffect(() => { refresh(); }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button onClick={() => setShowForm((s) => !s)}>
            {showForm ? 'Close' : 'Add product'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-6">
            <ProductForm onSaved={() => { setShowForm(false); refresh(); }} />
          </div>
        )}

        <div className="bg-white border rounded-xl divide-y">
          {products.map((p) => (
            <div key={p._id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p.category} · ${p.basePrice}</div>
              </div>
              <Link href={`/admin/products/${p._id}`} className="text-sm text-brand-600 hover:underline">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default function AdminProducts() {
  return <ProtectedRoute adminOnly><ProductsList /></ProtectedRoute>;
}