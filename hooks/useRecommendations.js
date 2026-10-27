import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useRecommendations(productId, selections) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    api
      .post('/api/ai/recommend', { productId, selections })
      .then((data) => setItems(data.recommendations || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [productId, JSON.stringify(selections)]); // eslint-disable-line

  return { items, loading };
}