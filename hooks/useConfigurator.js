import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection, setProduct, setTotalPrice, reset, setSavedId } from '@/store/configuratorSlice';
import { computeTotalPrice } from '@/lib/pricing';
import { api } from '@/lib/api';

export function useConfigurator() {
  const dispatch = useDispatch();
  const { product, selections, totalPrice, savedId } = useSelector((s) => s.configurator);

  const initProduct = useCallback((p) => {
    dispatch(setProduct(p));
  }, [dispatch]);

  const chooseMaterial = useCallback((part, material) => {
    dispatch(setSelection({ part, material: material.name, color: material.color }));
    // recompute
    const next = { ...selections, [part]: { material: material.name, color: material.color } };
    dispatch(setTotalPrice(computeTotalPrice(product, next)));
  }, [dispatch, selections, product]);

  const save = useCallback(async (name = 'My config') => {
    const res = await api.post('/api/configurations', {
      productId: product._id,
      selections,
      name,
    });
    dispatch(setSavedId(res.configuration._id));
    return res.configuration;
  }, [dispatch, product, selections]);

  const resetAll = useCallback(() => dispatch(reset()), [dispatch]);

  return { product, selections, totalPrice, savedId, initProduct, chooseMaterial, save, resetAll };
}