export default function MaterialSelector({ part, onSelect, active }) {
  if (!part) return null;
  return (
    <div className="grid grid-cols-2 gap-2">
      {part.materials.map((m) => (
        <button
          key={m.name}
          onClick={() => onSelect(m)}
          className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${
            active === m.name
              ? 'border-brand-500 bg-brand-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span
            className="w-5 h-5 rounded-full border border-gray-300"
            style={{ backgroundColor: m.color }}
          />
          <span className="flex-1 text-left">{m.name}</span>
          {m.priceAdd > 0 && (
            <span className="text-xs text-gray-500">+${m.priceAdd}</span>
          )}
        </button>
      ))}
    </div>
  );
}