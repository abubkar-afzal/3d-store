import { cn } from '@/utils/cn';

export default function Input({ label, error, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <input
        className={cn(
          'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}