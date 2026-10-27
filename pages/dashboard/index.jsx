import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';
import { formatPrice } from '@/utils/formatPrice';

function DashboardInner() {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/configurations')
      .then((d) => setConfigs(d.configurations || []))
      .finally(() => setLoading(false));
  }, []);

  const del = async (id) => {
    await api.del(`/api/configurations/${id}`);
    setConfigs((c) => c.filter((x) => x._id !== id));
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My configurations</h1>
        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : configs.length === 0 ? (
          <p className="text-gray-500">You have not saved any configurations yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {configs.map((c) => (
              <div key={c._id} className="bg-white border rounded-xl p-4">
                <div className="text-xs text-gray-500">{c.product?.name}</div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-brand-600 font-bold mt-2">{formatPrice(c.totalPrice)}</div>
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/configurator/${c.product?._id}`}
                    className="text-sm text-brand-600 hover:underline"
                  >
                    Open
                  </Link>
                  <button onClick={() => del(c._id)} className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function Dashboard() {
  return <ProtectedRoute><DashboardInner /></ProtectedRoute>;
}