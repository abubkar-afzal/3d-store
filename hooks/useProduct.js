import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/api/products/${id}`)
      .then((data) => setProduct(data.product))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}