export default function PartSelector({ parts, activePart, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {parts.map((part) => (
        <button
          key={part.name}
          onClick={() => onChange(part.name)}
          className={`px-3 py-1.5 rounded-lg text-sm border ${
            activePart === part.name
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-brand-500'
          }`}
        >
          {part.name}
        </button>
      ))}
    </div>
  );
}