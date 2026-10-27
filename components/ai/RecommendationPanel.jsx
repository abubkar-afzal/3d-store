import { useRecommendations } from '@/hooks/useRecommendations';
import RecommendationCard from './RecommendationCard';
import Spinner from '@/components/ui/Spinner';

export default function RecommendationPanel({ productId, selections }) {
  const { items, loading } = useRecommendations(productId, selections);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">You may also like</h3>
      {loading ? (
        <div className="flex justify-center py-4"><Spinner /></div>
      ) : items.length === 0 ? (
        <p className="text-xs text-gray-400">No recommendations yet</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {items.map((p) => <RecommendationCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}