import { useBabylon } from './BabylonProvider';

export default function LoadingOverlay() {
  const { loading } = useBabylon();
  if (!loading) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-600">Loading 3D model…</span>
      </div>
    </div>
  );
}