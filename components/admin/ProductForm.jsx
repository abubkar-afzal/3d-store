import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';

export default function ProductForm({ initial, onSaved }) {
  const [form, setForm] = useState(
    initial || {
      name: '',
      description: '',
      category: 'general',
      basePrice: 0,
      modelFile: 'chair.glb',
      parts: [],
    }
  );
  const [partsText, setPartsText] = useState(
    JSON.stringify(initial?.parts || [], null, 2)
  );
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async () => {
    setBusy(true);
    setErr(null);
    try {
      let parts;
      try { parts = JSON.parse(partsText); } catch { throw new Error('Parts JSON invalid'); }
      const body = { ...form, basePrice: Number(form.basePrice), parts };

      if (initial?._id) {
        await api.put(`/api/products/${initial._id}`, body);
      } else {
        await api.post('/api/products', body);
      }
      onSaved?.();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 bg-white rounded-xl border p-4">
      <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <Input label="Base price" type="number" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} />
      <Input label="Model file (in /public/models)" value={form.modelFile} onChange={(e) => setForm({ ...form, modelFile: e.target.value })} />
      <label className="block text-sm font-medium text-gray-700">Parts (JSON)</label>
      <textarea
        className="w-full font-mono text-xs border rounded-lg p-2 h-48"
        value={partsText}
        onChange={(e) => setPartsText(e.target.value)}
      />
      {err && <p className="text-red-500 text-sm">{err}</p>}
      <Button onClick={submit} disabled={busy}>{busy ? 'Saving…' : 'Save product'}</Button>
    </div>
  );
}