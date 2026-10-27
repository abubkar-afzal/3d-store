import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '@/store/uiSlice';
import { useEffect } from 'react';

function ToastItem({ toast }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const t = setTimeout(() => dispatch(removeToast(toast.id)), 3500);
    return () => clearTimeout(t);
  }, [dispatch, toast.id]);

  const colors = {
    info: 'bg-gray-800',
    success: 'bg-green-600',
    error: 'bg-red-600',
  };
  return (
    <div className={`${colors[toast.type] || colors.info} text-white px-4 py-2 rounded-lg shadow-lg`}>
      {toast.message}
    </div>
  );
}

export default function ToastHost() {
  const toasts = useSelector((s) => s.ui.toasts);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => <ToastItem key={t.id} toast={t} />)}
    </div>
  );
}