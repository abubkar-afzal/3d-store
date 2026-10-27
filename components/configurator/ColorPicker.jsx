export default function ColorPicker({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">Custom color</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-8 rounded border border-gray-300 cursor-pointer"
      />
    </label>
  );
}