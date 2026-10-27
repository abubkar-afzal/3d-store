import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import ProductForm from '@/components/admin/ProductForm';
import Spinner from '@/components/ui/Spinner';
import { api } from '@/lib/api';

function EditInner() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/api/products/${id}`).then((d) => setProduct(d.product));
  }, [id]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit product</h1>
        {!product ? <Spinner /> : (
          <ProductForm initial={product} onSaved={() => router.push('/admin/products')} />
        )}
      </div>
    </Layout>
  );
}

export default function EditProduct() {
  return <ProtectedRoute adminOnly><EditInner /></ProtectedRoute>;
}