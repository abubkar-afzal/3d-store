import { formatPrice } from '@/utils/formatPrice';

export default function PriceDisplay({ price }) {
  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex items-baseline justify-between">
        <span className="text-gray-500 text-sm">Total</span>
        <span className="text-2xl font-bold text-brand-600">{formatPrice(price)}</span>
      </div>
    </div>
  );
}