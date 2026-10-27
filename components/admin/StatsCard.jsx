export default function StatsCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-3xl font-bold text-gray-900 mt-1">{icon} {value}</div>
    </div>
  );
}