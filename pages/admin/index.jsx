import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import StatsCard from '@/components/admin/StatsCard';
import { api } from '@/lib/api';

function AdminHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/api/admin/stats').then(setStats).catch(() => {});
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin dashboard</h1>
        {!stats ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <StatsCard label="Products" value={stats.products} icon="📦" />
            <StatsCard label="Configurations" value={stats.configurations} icon="🎨" />
            <StatsCard label="Users" value={stats.users} icon="👥" />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function AdminIndex() {
  return <ProtectedRoute adminOnly><AdminHome /></ProtectedRoute>;
}