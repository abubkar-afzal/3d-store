import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';

export default function RecommendationCard({ product }) {
  return (
    <Link
      href={`/configurator/${product._id}`}
      className="block bg-white rounded-lg border p-3 hover:shadow-md transition"
    >
      <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
      <div className="text-xs text-gray-500">{product.category}</div>
      <div className="text-brand-600 font-semibold text-sm mt-1">
        {formatPrice(product.basePrice)}
      </div>
    </Link>
  );
}