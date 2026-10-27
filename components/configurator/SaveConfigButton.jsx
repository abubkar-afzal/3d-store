import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SaveConfigButton({ onSave, disabled }) {
  const [name, setName] = useState('My configuration');
  const [busy, setBusy] = useState(false);

  const handle = async () => {
    setBusy(true);
    try {
      await onSave(name);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Config name" />
      <Button onClick={handle} disabled={disabled || busy} className="w-full">
        {busy ? 'Saving…' : 'Save configuration'}
      </Button>
    </div>
  );
}